import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { readFile, writeFile } from 'node:fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const projectRoot = path.resolve(__dirname, '..');
export const presentationsDir = path.join(
	projectRoot,
	'react',
	'demo',
	'src',
	'presentations'
);
export const catalogPath = path.join(
	projectRoot,
	'react',
	'demo',
	'src',
	'data',
	'presentations.ts'
);

export function slugify(value) {
	return value
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
}

export function toPascalCase(value) {
	return value
		.split('-')
		.filter(Boolean)
		.map((chunk) => chunk.charAt(0).toUpperCase() + chunk.slice(1))
		.join('');
}

export function escapeForSingleQuotedTs(value) {
	return value.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

export function formatCategories(categories) {
	return categories.map((category) => `'${escapeForSingleQuotedTs(category)}'`).join(', ');
}

export async function readCatalogFile() {
	return readFile(catalogPath, 'utf8');
}

export async function writeCatalogFile(content) {
	await writeFile(catalogPath, content, 'utf8');
}

export function collectExistingIds(catalogContent) {
	return new Set(
		Array.from(catalogContent.matchAll(/id:\s*'([^']+)'/g), (match) => match[1])
	);
}

export function generatePresentationId(existingIds) {
	const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

	for (let attempt = 0; attempt < 500; attempt += 1) {
		let id = '';
		for (let index = 0; index < 6; index += 1) {
			id += alphabet[Math.floor(Math.random() * alphabet.length)];
		}

		if (!existingIds.has(id)) {
			return id;
		}
	}

	throw new Error('No se pudo generar un ID unico para la presentacion.');
}

function extractField(block, fieldName) {
	const match = block.match(new RegExp(`${fieldName}:\\s*'([^']*)'`));
	return match?.[1] ?? null;
}

function extractCategories(block) {
	const match = block.match(/categories:\s*\[([^\]]*)\]/);
	if (!match) {
		return [];
	}

	return Array.from(match[1].matchAll(/'([^']+)'/g), (item) => item[1]);
}

function extractComponent(block) {
	const match = block.match(/component:\s*([A-Za-z0-9_]+)/);
	return match?.[1] ?? null;
}

export function parseCatalogEntries(catalogContent) {
	const arrayMatch = catalogContent.match(
		/export const presentations: PresentationDefinition\[\] = \[(?<body>[\s\S]*?)\n\];/
	);

	if (!arrayMatch?.groups?.body) {
		return [];
	}

	const body = arrayMatch.groups.body;
	const entryRegex = /\t\{[\s\S]*?\t\},/g;
	const entries = [];

	for (const match of body.matchAll(entryRegex)) {
		const block = match[0];
		const pathValue = extractField(block, 'path');
		const slugValue = extractField(block, 'slug');
		const normalizedSlug =
			slugValue ?? (pathValue ? path.posix.basename(pathValue) : null);

		entries.push({
			block,
			id: extractField(block, 'id'),
			title: extractField(block, 'title'),
			author: extractField(block, 'author'),
			date: extractField(block, 'date'),
			slug: normalizedSlug,
			path: pathValue,
			component: extractComponent(block),
			categories: extractCategories(block),
		});
	}

	return entries;
}

export function buildCatalogEntry({
	id,
	title,
	slug,
	author,
	date,
	categories,
	componentName,
}) {
	return `\t{
\t\tid: '${escapeForSingleQuotedTs(id)}',
\t\ttitle: '${escapeForSingleQuotedTs(title)}',
\t\tslug: '${escapeForSingleQuotedTs(slug)}',
\t\tauthor: '${escapeForSingleQuotedTs(author)}',
\t\tdate: '${escapeForSingleQuotedTs(date)}',
\t\tcategories: [${formatCategories(categories)}],
\t\tpath: '/presentations/${escapeForSingleQuotedTs(slug)}',
\t\tcomponent: ${componentName},
\t},`;
}

export async function ensureCatalogSlugAvailable(slug) {
	const catalogContent = await readCatalogFile();
	const importPathFragment = `../presentations/${slug}/Presentation`;
	const entries = parseCatalogEntries(catalogContent);

	if (
		entries.some((entry) => entry.slug === slug || entry.path === `/presentations/${slug}`) ||
		catalogContent.includes(importPathFragment)
	) {
		throw new Error(
			`La presentacion "${slug}" ya figura en el catalogo. No se sobrescribio ningun archivo.`
		);
	}
}

export async function addPresentationToCatalog({
	id,
	title,
	slug,
	author,
	date,
	categories,
}) {
	const componentName = `${toPascalCase(slug)}Presentation`;
	const importLine = `import ${componentName} from '../presentations/${slug}/Presentation';`;
	const catalogContent = await readCatalogFile();
	const typeImportLine =
		"import type { PresentationDefinition } from '../types/presentations';";

	if (!catalogContent.includes(typeImportLine)) {
		return {
			updated: false,
			manualFile: catalogPath,
			reason: 'No se encontro el punto de insercion del import de tipos.',
		};
	}

	let updatedContent = catalogContent.replace(
		typeImportLine,
		`${importLine}\n${typeImportLine}`
	);

	const arrayEndMarker = '];';
	const arrayEndIndex = updatedContent.lastIndexOf(arrayEndMarker);
	if (arrayEndIndex === -1) {
		return {
			updated: false,
			manualFile: catalogPath,
			reason: 'No se encontro el cierre del array de presentaciones.',
		};
	}

	const entry = buildCatalogEntry({
		id,
		title,
		slug,
		author,
		date,
		categories,
		componentName,
	});

	updatedContent = `${updatedContent.slice(0, arrayEndIndex)}${entry}\n${updatedContent.slice(arrayEndIndex)}`;
	await writeCatalogFile(updatedContent);

	return {
		updated: true,
		manualFile: null,
		reason: null,
	};
}

export async function removePresentationFromCatalog(entryToRemove) {
	const catalogContent = await readCatalogFile();
	const importLinePattern = new RegExp(
		`^import .*\\.\\.\\/presentations\\/${entryToRemove.slug}\\/Presentation';\\r?\\n`,
		'm'
	);

	if (!catalogContent.includes(entryToRemove.block)) {
		return {
			updated: false,
			manualFile: catalogPath,
			reason: 'No se encontro la entrada exacta dentro del catalogo.',
		};
	}

	let updatedContent = catalogContent.replace(importLinePattern, '');
	updatedContent = updatedContent.replace(`${entryToRemove.block}\n`, '');

	if (updatedContent === catalogContent) {
		return {
			updated: false,
			manualFile: catalogPath,
			reason: 'No se pudo actualizar el catalogo de forma segura.',
		};
	}

	await writeCatalogFile(updatedContent);

	return {
		updated: true,
		manualFile: null,
		reason: null,
	};
}
