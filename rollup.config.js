import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

// Convert CJS modules to ES6, so they can be included in a bundle
import commonjs from 'rollup-plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import postcssModules from 'postcss-modules';
import uglify from 'rollup-plugin-uglify';
import tailwindcss from 'tailwindcss';

const cssExportMap = {};
const isProd = process.env.NODE_ENV === 'production';

export default {
    input: 'src/app.js',
    output: {
        file: 'dist/bundle.js',
        format: 'cjs',
        sourcemap: true
    },
    external: [
        'react',
        'react-proptypes',
        'commonjs-external:url'
    ],
    plugins: [
        resolve({
            preferBuiltins: true
        }),
        postcss({
            plugins: [
                postcssModules({
                    getJSON (id, exportTokens) {
                        cssExportMap[id] = exportTokens;
                    }
                }),
                tailwindcss('./tailwind.js'),
                require('autoprefixer'),
            ],
            getExportNamed: false,
            getExport (id) {
                return cssExportMap[id];
            },
            extract: 'dist/styles.css',
        }),
        babel({
            exclude: 'node_modules/**',
            plugins: ['external-helpers']
        }),
        commonjs({
            namedExports: {
                // left-hand side can be an absolute path, a path
                // relative to the current directory, or the name
                // of a module in node_modules
                'node_modules/react-dom/index.js': [ 'createPortal' ],
                'node_modules/react-dates/index.js': [ 'SingleDatePicker' ]
            }
        }),
        isProd && uglify(),
    ]
};