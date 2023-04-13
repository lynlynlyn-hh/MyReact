import path from 'path';
import fs from 'fs';
import ts from 'rollup-plugin-typescript2';
import cjs from '@rollup/plugin-commonjs';

const pkgPath = path.resolve(__dirname, '../../packages');
const distPath = path.resolve(__dirname, '../../dist/node_modules');

// 获取包名
export function resolvePkgPath(PkgName, isDist) {
	if (isDist) {
		return `${distPath}/${PkgName}`;
	}
	return `${pkgPath}/${PkgName}`;
}

// 获取每个包的package.json -> obj
export function getPackageJSON(PkgName) {
	const path = `${resolvePkgPath(PkgName)}/package.json`;
	const str = fs.readFileSync(path, { encoding: 'utf-8' });
	return JSON.parse(str);
}

export function getBaseRollupPlugins({ typescript = {} } = {}) {
	return [cjs(), ts(typescript)];
}
