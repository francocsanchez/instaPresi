import { existsSync } from 'fs';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

function resolveFirstExisting(...candidates: string[]) {
	const match = candidates.find((candidate) => existsSync(candidate));

	if (!match) {
		return candidates[0];
	}

	return match;
}

const reactRoot = resolveFirstExisting(
	resolve(__dirname, 'node_modules/react'),
	resolve(__dirname, '../node_modules/react')
);

const reactDomRoot = resolveFirstExisting(
	resolve(__dirname, 'node_modules/react-dom'),
	resolve(__dirname, '../node_modules/react-dom')
);

export default defineConfig({
	root: __dirname,
	plugins: [react()],
	resolve: {
		alias: [
			{ find: '@revealjs/react', replacement: resolve(__dirname, '../src/index.ts') },
			{ find: /^reveal\.js\/(.+)$/, replacement: resolve(__dirname, '../../dist/$1') },
			{ find: 'reveal.js', replacement: resolve(__dirname, '../../dist/reveal.mjs') },
			{ find: 'react-dom', replacement: reactDomRoot },
			{ find: 'react/jsx-dev-runtime', replacement: `${reactRoot}/jsx-dev-runtime.js` },
			{ find: 'react/jsx-runtime', replacement: `${reactRoot}/jsx-runtime.js` },
			{ find: 'react', replacement: reactRoot },
		],
		dedupe: ['react', 'react-dom'],
	},
});
