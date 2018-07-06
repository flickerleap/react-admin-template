import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

// Convert CJS modules to ES6, so they can be included in a bundle
import commonjs from 'rollup-plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import postcssModules from 'postcss-modules';
import uglify from 'rollup-plugin-uglify';
import url from "rollup-plugin-url";

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
        'url',
        'events',
        'classnames',
        'query-string'
    ],
    plugins: [
        resolve({
            preferBuiltins: true
        }),
        url({
            include: ["images/*"], // defaults to .svg, .png, .jpg and .gif files
            emitFiles: true // defaults to true
        }),
        postcss({
            plugins: [
                postcssModules({
                    getJSON (id, exportTokens) {
                        cssExportMap[id] = exportTokens;
                    }
                })
            ],
            extensions: [ '.css' ],
            getExportNamed: false,
            getExport(id) {
                return cssExportMap[id];
            },
            extract: 'dist/bundle.css'
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
                'node_modules/react-dom/index.js': [ 'createPortal', 'findDOMNode' ],
                'node_modules/validate.js/validate.js': [ 'validate' ]
            }
        }),
        isProd && uglify(),
    ]
};