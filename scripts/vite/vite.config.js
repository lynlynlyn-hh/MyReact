import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolvePkgPath } from '../rollup/utils';
import path from 'path';

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: [
			{
				find: 'react',
				replacement: resolvePkgPath('react')
			},
			{
				find: 'react-dom',
				replacement: resolvePkgPath('react-dom')
			},
			{
				find: 'hostConfig',
				replacement: path.resolve(
					resolvePkgPath('react-dom'),
					'./src/hostConfig.ts'
				)
			}
		]
	}
});
