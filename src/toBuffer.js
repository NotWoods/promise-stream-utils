import { PromiseWritable } from './constructors.js';
import { finished } from './awaitEvent.js';

/**
 * Loads an entire stream's contents into a buffer in memory
 * @param {stream.Readable} stream
 * @returns {Promise<Buffer>}
 */
export default function toBuffer(stream) {
	const chunks = [];

	const output = new PromiseWritable({
		decodeStrings: true,
		write(chunk) { chunks.push(chunk); },
	});

	return finished(stream.pipe(output))
		.then(() => Buffer.concat(chunks));
}
