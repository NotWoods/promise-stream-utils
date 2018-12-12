/**
 * Resolves when the `'end'` event fires, rejects when the `'error'` event fires
 * @param {import("stream").Readable} stream
 * @returns {Promise<void>}
 */
export function ended(stream) {
    return new Promise((resolve, reject) => {
        stream.once('end', resolve).once('error', reject);
    });
}

/**
 * Resolves when the `'finish'` event fires, rejects when the `'error'` event fires
 * @param {import("stream").Writable} stream
 * @returns {Promise<void>}
 */
export function finished(stream) {
    return new Promise((resolve, reject) => {
        stream.once('finish', resolve).once('error', reject);
    });
}
