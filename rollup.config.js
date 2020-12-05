import autoPreprocess from 'svelte-preprocess';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import resolve from '@rollup/plugin-node-resolve';
import html2 from 'rollup-plugin-html2';
import svelte from 'rollup-plugin-svelte';
import dev from 'rollup-plugin-dev';
import postcss from 'rollup-plugin-postcss';
import del from 'rollup-plugin-delete';
import { terser } from 'rollup-plugin-terser';
import livereload from 'rollup-plugin-livereload';
import typescript from '@rollup/plugin-typescript';

const buildFolder = 'dist';
const isDevelopment = process.env.NODE_ENV === 'development';

const plugins = [
    replace({
        __apiUrl__: isDevelopment
            ? 'http://localhost:8008/'
            : 'https://argent-72ltbia36q-ew.a.run.app/',
    }),
    svelte({
        preprocess: autoPreprocess(),
        dev: isDevelopment,
        extensions: ['.svelte'],
        emitCss: true,
    }),
    postcss({
        extract: true,
    }),
    commonjs(),
    resolve(),
    html2({
        template: 'src/index.html',
        favicon: 'src/favicon.png',
    }),
    typescript({ sourceMap: isDevelopment, inlineSources: isDevelopment }),
    del({ targets: 'dist/*' }),
];
if (isDevelopment) {
    plugins.push(
        dev({
            dirs: [buildFolder],
            port: 5000,
            // not needed with CORS proxy: { '/api/*': 'http://localhost:8008/' },
            spa: `./${buildFolder}/index.html`,
        }),
        livereload({ watch: `./${buildFolder}` }),
    );
} else {
    plugins.push(terser());
}

module.exports = {
    input: 'src/main.ts',
    output: {
        sourcemap: true,
        format: 'iife',
        dir: buildFolder,
        entryFileNames: '[name].[hash].js',
    },
    plugins,
};
