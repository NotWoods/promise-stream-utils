export default {
	entry: 'src/index.js',
	sourceMap: true,
	targets: [
		{ dest: 'index.js', format: 'cjs' },
		{ dest: 'index.es.js', format: 'es' },
	],
	external: ['stream'],
};
