const { Readable, Writable } = require('stream');
const { createReadStream } = require('fs');
const { ended, finished } = require('../');

class DevNull extends Writable {
    /**
     *
     * @param {Buffer | string | any} chunk
     * @param {string} encoding
     * @param {(err: any) => void} cb
     */
    _write(chunk, encoding, cb) {
        setImmediate(cb);
    }
}

describe('ended', () => {
    it('should resolve when the stream ends', () => {
        const myReadable = new Readable({
            read() {
                this.push(null);
            },
        });

        const check = ended(myReadable);
        myReadable.pipe(new DevNull());

        return expect(check).resolves.toBeUndefined();
    });

    it('should reject when the stream errors', () => {
        const myReadable = new Readable({
            read() {
                this.emit('error', new TypeError());
            },
        });

        const check = ended(myReadable);
        myReadable.pipe(new DevNull());

        return expect(check).rejects.toBeInstanceOf(TypeError);
    });
});

describe('finished', () => {
    it('should resolve when the stream finishes', () => {
        const myWritable = new DevNull();
        const check = finished(myWritable);
        createReadStream(__filename).pipe(myWritable);

        return expect(check).resolves.toBeUndefined();
    });

    it('should reject when the stream errors', () => {
        const myWritable = new Writable({
            write(chunk, encoding, callback) {
                callback(new TypeError());
            },
        });

        const check = finished(myWritable);
        createReadStream(__filename).pipe(myWritable);

        return expect(check).rejects.toBeInstanceOf(TypeError);
    });
});
