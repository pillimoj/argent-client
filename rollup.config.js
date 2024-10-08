import autoPreprocess from 'svelte-preprocess';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import resolve from '@rollup/plugin-node-resolve';
import html2 from 'rollup-plugin-html2';
import svelte from 'rollup-plugin-svelte';
import dev from 'rollup-plugin-dev';
import postcss from 'rollup-plugin-postcss';
import del from 'rollup-plugin-delete';
import copy from 'rollup-plugin-copy';
import { terser } from 'rollup-plugin-terser';
import livereload from 'rollup-plugin-livereload';
import typescript from '@rollup/plugin-typescript';

const buildFolder = 'dist';
const isDevelopment = process.env.NODE_ENV === 'development';

const plugins = [
    replace({
        __apiUrl__: isDevelopment ? '/' : 'https://api.argent.grimsborn.com/',
        __apiWsUrl__: isDevelopment
            ? 'ws://localhost:8008'
            : 'wss://api.argent.grimsborn.com',
        preventAssignment: true,
    }),
    svelte({
        preprocess: autoPreprocess(),
        dev: isDevelopment,
        extensions: ['.svelte'],
        emitCss: true,
        onwarn: (warning, handler) => {
            if (warning.code === 'a11y-click-events-have-key-events') return
            handler(warning)
        },
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
    copy({
        targets: [{ src: 'assets/*', dest: 'dist' }],
    }),
];
if (isDevelopment) {
    plugins.push(
        dev({
            dirs: [buildFolder],
            port: 5000,
            proxy: { '/api/*': 'http://localhost:8008/' }, // needed for samesite without https
            spa: `./${buildFolder}/index.html`,
        }),
        livereload({ watch: `./${buildFolder}` }),
    );
} else {
    plugins.push(terser());
}
plugins.push(del({ targets: ['dist/*'] }));

module.exports = {
    input: 'src/main.ts',
    output: {
        name: 'argent.client',
        sourcemap: isDevelopment,
        format: 'iife',
        dir: buildFolder,
        entryFileNames: '[name].[hash].js',
    },
    plugins,
};
