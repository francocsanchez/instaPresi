import { existsSync } from 'node:fs';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { stdin as input, stdout as output } from 'node:process';
import { createInterface } from 'node:readline/promises';
import {
	addPresentationToCatalog,
	collectExistingIds,
	ensureCatalogSlugAvailable,
	formatCategories,
	generatePresentationId,
	presentationsDir,
	readCatalogFile,
	slugify,
} from './presentation-catalog.js';

function buildPresentationTsx({ classPrefix }) {
	return `import { Deck, Slide } from '@revealjs/react';
import PresentationFrame from '../../components/PresentationFrame';
import {
	agendaItems,
	closingMessage,
	contentCards,
	presentationMetadata,
} from './data';
import 'reveal.js/reveal.css';
import 'reveal.js/theme/white.css';
import './styles.css';

function Presentation() {
	return (
		<PresentationFrame>
			<Deck
				config={{
					hash: true,
					controls: true,
					progress: true,
					center: false,
					margin: 0,
					disableLayout: true,
					transition: 'slide',
					width: '100%',
					height: '100%',
				}}
			>
				<Slide className="${classPrefix} ${classPrefix}--cover">
					<div className="${classPrefix}__surface">
						<div className="${classPrefix}__hero">
							<p className="${classPrefix}__eyebrow">Presentacion</p>
							<h1>{presentationMetadata.title}</h1>
							<div className="${classPrefix}__meta">
								<p><strong>ID</strong> {presentationMetadata.id}</p>
								<p><strong>Autor</strong> {presentationMetadata.author}</p>
								<p><strong>Fecha</strong> {presentationMetadata.date}</p>
								<p>
									<strong>Categorias</strong> {presentationMetadata.categories.join(' | ')}
								</p>
							</div>
						</div>
					</div>
				</Slide>

				<Slide className="${classPrefix} ${classPrefix}--content">
					<div className="${classPrefix}__surface">
						<div className="${classPrefix}__panel">
							<p className="${classPrefix}__eyebrow">Agenda</p>
							<h2>{presentationMetadata.subtitle}</h2>
							<ul className="${classPrefix}__list">
								{agendaItems.map((item) => (
									<li key={item}>{item}</li>
								))}
							</ul>
						</div>
					</div>
				</Slide>

				<Slide className="${classPrefix} ${classPrefix}--content">
					<div className="${classPrefix}__surface">
						<div className="${classPrefix}__panel">
							<p className="${classPrefix}__eyebrow">Contenido</p>
							<h2>Desarrollo</h2>
							<div className="${classPrefix}__grid">
								{contentCards.map((card) => (
									<article key={card.title} className="${classPrefix}__card">
										<h3>{card.title}</h3>
										<p>{card.text}</p>
									</article>
								))}
							</div>
						</div>
					</div>
				</Slide>

				<Slide className="${classPrefix} ${classPrefix}--closing">
					<div className="${classPrefix}__surface">
						<div className="${classPrefix}__panel">
							<p className="${classPrefix}__eyebrow">Cierre</p>
							<h2>Gracias</h2>
							<p>{closingMessage}</p>
						</div>
					</div>
				</Slide>
			</Deck>
		</PresentationFrame>
	);
}

export default Presentation;
`;
}

function buildDataTs({ id, title, author, date, categories }) {
	return `export const presentationMetadata = {
	id: '${id}',
	title: '${title.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}',
	subtitle: 'Resumen inicial',
	author: '${author.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}',
	date: '${date.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}',
	categories: [${formatCategories(categories)}],
};

export const agendaItems = [
	'Contexto general',
	'Principales indicadores',
	'Proximos pasos',
];

export const contentCards = [
	{
		title: 'Punto clave 1',
		text: 'Espacio reservado para desarrollar el primer mensaje principal.',
	},
	{
		title: 'Punto clave 2',
		text: 'Espacio reservado para sumar un dato, insight o resultado destacado.',
	},
	{
		title: 'Punto clave 3',
		text: 'Espacio reservado para cerrar la idea central de la presentacion.',
	},
];

export const closingMessage =
	'Espacio reservado para el cierre final o el siguiente paso sugerido.';
`;
}

function buildStylesCss(classPrefix) {
	return `.${classPrefix} {
	width: 100% !important;
	height: 100% !important;
	padding: 0 !important;
	margin: 0 !important;
	inset: 0 !important;
	box-sizing: border-box;
	overflow: hidden;
	background: transparent !important;
}

.presentation-frame .reveal,
.presentation-frame .reveal .slides,
.presentation-frame .reveal .slides > section.${classPrefix} {
	width: 100% !important;
	height: 100% !important;
}

.${classPrefix}__surface {
	width: 100%;
	height: 100%;
	padding: 3.5rem;
	box-sizing: border-box;
	color: #14213d;
	background:
		radial-gradient(circle at top right, rgba(249, 199, 79, 0.35), transparent 28%),
		linear-gradient(135deg, #f8fbff 0%, #edf4ff 50%, #ffffff 100%);
	font-family: 'Aptos', 'Segoe UI', sans-serif;
}

.${classPrefix}--cover {
	display: grid !important;
	place-items: center;
}

.${classPrefix}__hero,
.${classPrefix}__panel {
	width: min(100%, 52rem);
	padding: 2.5rem 2.75rem;
	border-radius: 2rem;
	background: rgba(255, 255, 255, 0.82);
	box-shadow: 0 22px 60px rgba(20, 33, 61, 0.12);
	text-align: left;
}

.${classPrefix} h1,
.${classPrefix} h2,
.${classPrefix} h3 {
	margin: 0;
	color: #0b132b;
	font-family: 'Georgia', 'Times New Roman', serif;
}

.${classPrefix} h1 {
	font-size: 3rem;
	line-height: 1.05;
}

.${classPrefix} h2 {
	font-size: 2.35rem;
}

.${classPrefix} p {
	margin: 0;
}

.${classPrefix}__eyebrow {
	margin-bottom: 1rem !important;
	font-size: 0.9rem;
	font-weight: 700;
	letter-spacing: 0.18em;
	text-transform: uppercase;
	color: #d97706;
}

.${classPrefix}__meta {
	display: grid;
	gap: 0.75rem;
	margin-top: 1.75rem;
	font-size: 1.1rem;
	line-height: 1.45;
}

.${classPrefix}__meta strong {
	display: inline-block;
	min-width: 6.5rem;
	color: #334155;
}

.${classPrefix}__panel {
	display: grid;
	gap: 1rem;
}

.${classPrefix}__list {
	margin: 0;
	padding-left: 1.4rem;
	display: grid;
	gap: 0.75rem;
	font-size: 1.15rem;
	line-height: 1.5;
}

.${classPrefix}__grid {
	display: grid;
	grid-template-columns: repeat(3, minmax(0, 1fr));
	gap: 1rem;
}

.${classPrefix}__card {
	padding: 1.25rem;
	border-radius: 1.2rem;
	background: rgba(236, 244, 255, 0.95);
	border: 1px solid rgba(148, 163, 184, 0.28);
	display: grid;
	gap: 0.75rem;
	min-height: 14rem;
	align-content: start;
}

.${classPrefix}__card p {
	font-size: 1rem;
	line-height: 1.5;
	color: #334155;
}
`;
}

async function askRequiredQuestion(rl, label) {
	const answer = (await rl.question(`${label}: `)).trim();
	if (!answer) {
		throw new Error(`El campo "${label}" es obligatorio.`);
	}
	return answer;
}

async function readPipedAnswers() {
	let buffer = '';

	for await (const chunk of input) {
		buffer += chunk;
	}

	return buffer
		.split(/\r?\n/)
		.map((line) => line.trim())
		.filter(Boolean);
}

async function main() {
	const pipedAnswers = input.isTTY ? null : await readPipedAnswers();
	const rl = pipedAnswers ? null : createInterface({ input, output });
	let catalogResult = null;

	const ask = async (label) => {
		if (pipedAnswers) {
			const answer = pipedAnswers.shift() ?? '';
			console.log(`${label}: ${answer}`);
			if (!answer) {
				throw new Error(`El campo "${label}" es obligatorio.`);
			}
			return answer;
		}

		return askRequiredQuestion(rl, label);
	};

	try {
		const title = await ask('Nombre o titulo de la presentacion');
		const date = await ask('Fecha');
		const author = await ask('Autor');
		const categoriesAnswer = await ask('Categorias (separadas por coma)');

		const categories = categoriesAnswer
			.split(',')
			.map((category) => category.trim())
			.filter(Boolean);

		if (categories.length === 0) {
			throw new Error('Debes ingresar al menos una categoria.');
		}

		const slug = slugify(title);
		if (!slug) {
			throw new Error(
				'No se pudo generar un slug valido a partir del titulo ingresado.'
			);
		}

		const presentationDir = path.join(presentationsDir, slug);
		if (existsSync(presentationDir)) {
			throw new Error(
				`Ya existe una presentacion con el slug "${slug}". No se sobrescribio ningun archivo.`
			);
		}

		await ensureCatalogSlugAvailable(slug);

		const catalogContent = await readCatalogFile();
		const id = generatePresentationId(collectExistingIds(catalogContent));
		const classPrefix = `ppt-${slug}`;

		await mkdir(presentationsDir, { recursive: true });
		await mkdir(presentationDir, { recursive: false });
		await writeFile(
			path.join(presentationDir, 'Presentation.tsx'),
			buildPresentationTsx({ classPrefix }),
			'utf8'
		);
		await writeFile(
			path.join(presentationDir, 'data.ts'),
			buildDataTs({ id, title, author, date, categories }),
			'utf8'
		);
		await writeFile(
			path.join(presentationDir, 'styles.css'),
			buildStylesCss(classPrefix),
			'utf8'
		);

		catalogResult = await addPresentationToCatalog({
			id,
			title,
			slug,
			author,
			date,
			categories,
		});

		console.log('');
		console.log('Presentacion creada correctamente:');
		console.log(`- ID: ${id}`);
		console.log(`- Titulo: ${title}`);
		console.log(`- Autor: ${author}`);
		console.log(`- Fecha: ${date}`);
		console.log(`- Categorias: ${categories.join(', ')}`);
		console.log(`- Carpeta: ${slug}`);
		console.log(`- Ruta: ${presentationDir}`);

		if (catalogResult.updated) {
			console.log('- Catalogo: actualizacion automatica completada');
		} else {
			console.warn('- Catalogo: no se actualizo automaticamente');
			console.warn(`  Archivo a revisar: ${catalogResult.manualFile}`);
			console.warn(`  Motivo: ${catalogResult.reason}`);
		}
	} catch (error) {
		console.error('');
		console.error(
			error instanceof Error ? error.message : 'Ocurrio un error inesperado.'
		);
		process.exitCode = 1;
	} finally {
		rl?.close();
	}
}

main();
