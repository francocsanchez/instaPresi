import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@revealjs/react': resolve(__dirname, '../src/index.ts'),
			react: resolve(__dirname, '../node_modules/react'),
			'react-dom': resolve(__dirname, '../node_modules/react-dom'),
			'react/jsx-runtime': resolve(__dirname, '../node_modules/react/jsx-runtime.js'),
		},
		dedupe: ['react', 'react-dom'],
	},
});
