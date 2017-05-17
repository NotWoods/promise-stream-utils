import * as stream from 'stream';

export function ended(stream: NodeJS.ReadableStream): Promise<void>;
export function finished(stream: NodeJS.WritableStream): Promise<void>;
export function toBuffer(stream: NodeJS.ReadableStream): Promise<Buffer>;

type Resolveable<T> = Promise<T> | T;
type EncodingType = string | null;
type ChunkType = Buffer | string;
type ChunkObjectType = ChunkType | null;
type PushType = ChunkType | null;
type PushObjectType = ChunkObjectType | null;
type ChunkList = { chunk: ChunkType, encoding: EncodingType }[];
type ChunkObjectList = { chunk: ChunkObjectType, encoding: EncodingType }[];

interface ReadableOptionsBase {
	highWaterMark?: number,
	encoding?: string | null,
	objectMode?: boolean,
}

interface WritableOptionsBase {
	highWaterMark?: number,
	decodeStrings?: boolean,
	objectMode?: boolean,
}

interface ReadableOptions extends ReadableOptionsBase {
	objectMode?: false,
	read?: (size: number) => Resolveable<PushType | void>,
}
interface ReadableObjectOptions extends ReadableOptionsBase {
	objectMode: true,
	read?: (size: number) => Resolveable<PushObjectType | void>,
}

export class PromiseReadable extends stream.Readable {
	constructor(options: ReadableObjectOptions);
	constructor(options: ReadableOptions);
}

interface WritableOptions extends WritableOptionsBase {
	objectMode?: false,
	write?: (chunk: ChunkType, encoding: EncodingType) => Resolveable<void>,
	writev?: (chunks: ChunkList) => Resolveable<void>,
}
interface WritableObjectOptions extends WritableOptionsBase {
	objectMode: true,
	write?: (chunk: ChunkObjectType, encoding: EncodingType) => Resolveable<void>,
	writev?: (chunks: ChunkObjectList) => Resolveable<void>,
}

export class PromiseWritable extends stream.Writable {
	constructor(options: WritableObjectOptions);
	constructor(options: WritableOptions);
}

interface DuplexOptionsBase extends ReadableOptionsBase, WritableOptionsBase {
	allowHalfOpen?: boolean,
	readableObjectMode?: boolean,
	writableObjectMode?: boolean,
}
interface DuplexOptions extends ReadableOptions, WritableOptions, DuplexOptions {
	readableObjectMode?: false,
	writableObjectMode?: false,
	objectMode?: false,
}
interface DuplexRObjectOptions
	extends ReadableObjectOptions, WritableOptions, DuplexOptions {
	readableObjectMode: true,
	writableObjectMode?: false,
	objectMode?: false,
}
interface DuplexWObjectOptions
	extends ReadableOptions, WritableObjectOptions, DuplexOptions {
	readableObjectMode?: false,
	writableObjectMode: true,
	objectMode?: false,
}
interface DuplexObjectOptions
	extends ReadableObjectOptions, WritableObjectOptions, DuplexOptions {
	readableObjectMode?: false,
	writableObjectMode?: true,
	objectMode?: true,
}

export class PromiseDuplex extends stream.Duplex {
	constructor(options: DuplexObjectOptions);
	constructor(options: DuplexRObjectOptions);
	constructor(options: DuplexWObjectOptions);
	constructor(options: DuplexOptions);
}

interface TransformOptionsBase extends ReadableOptionsBase, WritableOptionsBase {}
interface TransformOptions extends ReadableOptions, WritableOptions {
	objectMode?: false,
	transform: (chunk: ChunkType, encoding: EncodingType) => Resolveable<PushType>,
	flush?: () => Resolveable<PushType | void>,
}
interface TransformObjectOptions extends ReadableObjectOptions, WritableObjectOptions {
	objectMode: true,
	transform: (chunk: ChunkObjectType, encoding: EncodingType) => Resolveable<PushObjectType>,
	flush?: () => Resolveable<PushObjectType | void>,
}

export class PromiseTransform extends stream.Transform {
	constructor(options: TransformObjectOptions);
	constructor(options: TransformOptions);
}
