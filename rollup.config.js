import * as path from 'path'

import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import css from 'rollup-plugin-css-only';
import alias from '@rollup/plugin-alias';
import json from '@rollup/plugin-json';

const production = !process.env.ROLLUP_WATCH;
const projectRootDir = path.resolve(__dirname);

function serve() {
	let server;

	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
				stdio: ['ignore', 'inherit', 'inherit'],
				shell: true
			});

			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
		}
	};
}

export default {
	input: 'src/main.js',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: 'public/build/bundle.js'
	},
	plugins: [
        alias({
            entries: [
                {
                    find: '@src',
                    replacement: path.resolve(projectRootDir, 'src'),
                },
                {
                    find: '@stores',
                    replacement: path.resolve(projectRootDir, 'src/stores'),
                },
                {
                    find: '@views',
                    replacement: path.resolve(projectRootDir, 'src/views'),
                },
                {
                    find: '@cp',
                    replacement: path.resolve(projectRootDir, 'src/components'),
                },
                {
                    find: '@layouts',
                    replacement: path.resolve(projectRootDir, 'src/layouts'),
                },
                {
                    find: '@scribbli-client',
                    replacement: path.resolve(projectRootDir, 'src/libs/scribbli-client'),
                },
                {
                    find: '@scribbli-forms',
                    replacement: path.resolve(projectRootDir, 'src/libs/scribbli-forms'),
                },
            ]
        }),
		svelte({
			compilerOptions: {
				// enable run-time checks when not in production
				dev: !production
			}
		}),
		// we'll extract any component CSS out into
		// a separate file - better for performance
		css({ output: 'bundle.css' }),

        json(),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration -
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		commonjs(),

		// In dev mode, call `npm run start` once
		// the bundle has been generated
		!production && serve(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload('public'),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser()
	],
	watch: {
		clearScreen: false
	}
};
