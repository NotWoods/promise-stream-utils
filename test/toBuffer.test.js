const { promisify } = require('util');
const { createReadStream, readFile } = require('fs');
const { toBuffer } = require('../');

const readFileAsync = promisify(readFile);

describe('toBuffer', () => {
    it('should resolve with the full buffer', async () => {
        const [buffer, contents] = await Promise.all([
            toBuffer(createReadStream(__filename)),
            readFileAsync(__filename, 'utf8'),
        ]);

        expect(buffer.toString('utf8')).toBe(contents);
    });
});
