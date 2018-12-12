import { PromiseWritable } from './constructors.js';
import { finished } from './awaitEvent.js';

/**
 * Loads an entire stream's contents into a buffer in memory
 * @param {import("stream").Readable} stream
 * @returns {Promise<Buffer>}
 */
export function toBuffer(stream) {
    /** @type {Buffer[]} */
    const chunks = [];

    const output = new PromiseWritable({
        decodeStrings: true,
        /** @param {Buffer} chunk */
        write(chunk) {
            chunks.push(chunk);
        },
    });

    return finished(stream.pipe(output)).then(() => Buffer.concat(chunks));
}
