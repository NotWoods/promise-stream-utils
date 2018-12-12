/** @type {import("rollup").RollupWatchOptions} */
const config = {
    input: 'src/index.js',
    output: [
        { file: 'index.js', format: 'cjs', sourcemap: true },
        { file: 'index.es.js', format: 'es', sourcemap: true },
    ],
    external: ['stream'],
};

export default config;
