import { access } from 'node:fs/promises';
import { constants } from 'node:fs';
import { catalogPath, parseCatalogEntries, readCatalogFile } from './presentation-catalog.js';

async function main() {
	try {
		await access(catalogPath, constants.F_OK);
	} catch {
		console.error(`No se encontro el catalogo de presentaciones: ${catalogPath}`);
		process.exitCode = 1;
		return;
	}

	const catalogContent = await readCatalogFile();
	const entries = parseCatalogEntries(catalogContent);

	if (entries.length === 0) {
		console.log('No hay presentaciones cargadas en el catalogo.');
		console.log('');
		console.log('Crea una nueva presentacion con:');
		console.log('```bash');
		console.log('npm run create:ppt');
		console.log('```');
		return;
	}

	for (const entry of entries) {
		const id = entry.id ?? 'SIN_ID';
		const title = entry.title ?? '(sin titulo)';
		console.log(`id: ${id} - ${title}`);
	}

	console.log('');
	console.log('Para eliminar una presentacion:');
	console.log('npm run delete:ppt -- ID');
}

main().catch((error) => {
	console.error(error instanceof Error ? error.message : 'Ocurrio un error inesperado.');
	process.exitCode = 1;
});
