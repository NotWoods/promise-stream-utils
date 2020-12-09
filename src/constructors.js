// @ts-nocheck
import { Readable, Writable, Duplex, Transform } from 'stream';

function wrapRead(readFunc) {
    return (size) =>
        Promise.resolve(readFunc(size))
            .then((result) => {
                if (result !== undefined) this.push(result);
            })
            .catch((err) => this.emit('error', err));
}
function wrapWrite(writeFunc) {
    return (chunk, encoding, next) =>
        Promise.resolve(writeFunc(chunk, encoding)).then(() => next(), next);
}
function wrapWritev(writeFunc) {
    return (chunks, next) =>
        Promise.resolve(writeFunc(chunks)).then(() => next(), next);
}
function wrapTransform(transformFunc) {
    return (chunk, encoding, next) =>
        Promise.resolve(transformFunc(chunk, encoding)).then(
            (result) => next(null, result),
            next,
        );
}
function wrapFlush(flushFunc) {
    return (next) =>
        Promise.resolve(flushFunc())
            .then((result) => {
                if (result !== undefined) this.push(result);
            })
            .catch(next);
}

/**
 * Readable stream constructor that uses async functions for write rather
 * than callbacks. Create a stream as `new PromiseReadable(opts)`.
 */
export class PromiseReadable extends Readable {
    constructor(options) {
        const superOpts = Object.assign({}, options);
        if (options.read) superOpts.read = wrapRead.call(this, options.read);

        super(superOpts);
    }
}

/**
 * Writable stream constructor that uses async functions for write rather
 * than callbacks. Create a stream as `new PromiseWritable(opts)`.
 */
export class PromiseWritable extends Writable {
    constructor(options) {
        const superOpts = Object.assign({}, options);
        if (options.write) superOpts.write = wrapWrite(options.write);
        if (options.writev) superOpts.writev = wrapWritev(options.writev);

        super(superOpts);
    }
}

/**
 * Duplex stream constructor that uses async functions for write rather
 * than callbacks. Create a stream as `new PromiseDuplex(opts)`.
 */
export class PromiseDuplex extends Duplex {
    constructor(options) {
        const superOpts = Object.assign({}, options);
        if (options.read) superOpts.read = wrapRead.call(this, options.read);
        if (options.write) superOpts.write = wrapWrite(options.write);
        if (options.writev) superOpts.writev = wrapWritev(options.writev);

        super(superOpts);
    }
}

/**
 * Transform stream constructor that uses async functions for write rather
 * than callbacks. Create a stream as `new PromiseTransform(opts)`.
 */
export class PromiseTransform extends Transform {
    constructor(options) {
        const superOpts = Object.assign({}, options);
        if (options.transform)
            superOpts.transform = wrapTransform(option.transform);
        if (options.flush) superOpts.flush = wrapFlush(option.flush);
        if (options.read) superOpts.read = wrapRead.call(this, options.read);
        if (options.write) superOpts.write = wrapWrite(options.write);
        if (options.writev) superOpts.writev = wrapWritev(options.writev);

        super(superOpts);
    }
}
