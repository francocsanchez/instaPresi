import { existsSync } from 'node:fs';
import { rm } from 'node:fs/promises';
import path from 'node:path';
import { stdin as input, stdout as output } from 'node:process';
import { createInterface } from 'node:readline/promises';
import {
	parseCatalogEntries,
	presentationsDir,
	readCatalogFile,
	removePresentationFromCatalog,
} from './presentation-catalog.js';

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

async function confirmDeletion() {
	const pipedAnswers = input.isTTY ? null : await readPipedAnswers();

	if (pipedAnswers) {
		return (pipedAnswers.shift() ?? '').trim();
	}

	const rl = createInterface({ input, output });

	try {
		return (await rl.question('¿Confirmas la eliminacion? (s/N) ')).trim();
	} finally {
		rl.close();
	}
}

async function main() {
	const id = process.argv[2]?.trim();

	if (!id) {
		console.error('Debes indicar el ID de la presentacion a eliminar.');
		console.error('Ejemplo: npm run delete:ppt -- A7F3K9');
		process.exitCode = 1;
		return;
	}

	const catalogContent = await readCatalogFile();
	const entries = parseCatalogEntries(catalogContent);
	const selectedPresentation = entries.find((entry) => entry.id === id);

	if (!selectedPresentation) {
		console.error(`No se encontro ninguna presentacion con el ID: ${id}`);
		process.exitCode = 1;
		return;
	}

	if (!selectedPresentation.slug) {
		console.error(
			`La presentacion con ID ${id} no tiene slug utilizable. Cancelando para evitar un borrado inseguro.`
		);
		process.exitCode = 1;
		return;
	}

	const presentationsRoot = path.resolve(presentationsDir);
	const presentationDir = path.resolve(presentationsDir, selectedPresentation.slug);
	const relativePath = path.relative(presentationsRoot, presentationDir);
	const isInsidePresentations =
		relativePath !== '' &&
		!relativePath.startsWith('..') &&
		!path.isAbsolute(relativePath);

	if (!isInsidePresentations) {
		console.error('La ruta de la presentacion es invalida o esta fuera de presentations/.');
		process.exitCode = 1;
		return;
	}

	if (!existsSync(presentationDir)) {
		console.error(
			`La carpeta de la presentacion no existe en disco: ${presentationDir}`
		);
		process.exitCode = 1;
		return;
	}

	console.log('Vas a eliminar la presentacion:');
	console.log(`- ID: ${selectedPresentation.id}`);
	console.log(`- Titulo: ${selectedPresentation.title ?? '(sin titulo)'}`);
	console.log(`- Autor: ${selectedPresentation.author ?? '(sin autor)'}`);
	console.log(`- Fecha: ${selectedPresentation.date ?? '(sin fecha)'}`);
	console.log(`- Carpeta: ${selectedPresentation.slug}`);

	const confirmation = await confirmDeletion();
	if (confirmation !== 's' && confirmation !== 'S') {
		console.log('Operacion cancelada.');
		return;
	}

	await rm(presentationDir, {
		recursive: true,
		force: false,
	});

	const catalogResult = await removePresentationFromCatalog(selectedPresentation);

	console.log('');
	console.log('Presentacion eliminada correctamente:');
	console.log(`- ID: ${selectedPresentation.id}`);
	console.log(`- Titulo: ${selectedPresentation.title ?? '(sin titulo)'}`);
	console.log(`- Carpeta eliminada: ${presentationDir}`);
	console.log(`- Catalogo actualizado: ${catalogResult.updated ? 'si' : 'no'}`);

	if (!catalogResult.updated) {
		console.warn(`- Archivo a revisar: ${catalogResult.manualFile}`);
		console.warn(`- Motivo: ${catalogResult.reason}`);
	}
}

main().catch((error) => {
	console.error(error instanceof Error ? error.message : 'Ocurrio un error inesperado.');
	process.exitCode = 1;
});
