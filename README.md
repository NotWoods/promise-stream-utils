# promise-stream-utils
Various functions for working with streams inside async functions.

## Awaiting stream events
Creates promises that resolve once the event has fired, and reject if
an error event is fired.

### ended
Resolves when the `'end'` event fires, rejects when the `'error'` event fires
```
function ended(stream: NodeJS.ReadableStream): Promise<void>
```

### finished
Resolves when the `'finish'` event fires, rejects when the `'error'` event fires
```
function finished(stream: NodeJS.WritableStream): Promise<void>
```

## Special stream classes
Special versions of the Readable, Writable, Duplex, and Transform stream
classes where async functions are used rather than functions with a callback.

Exported as:
* `PromiseReadable`
* `PromiseWritable`
* `PromiseDuplex`
* `PromiseTransform`

Create a stream using these classes by calling `new PromiseReadable(opts)`,
and set the stream function inside options.

## Other utility functions

### toBuffer
Loads an entire stream's contents into a buffer in memory
```
function ended(stream: NodeJS.ReadableStream): Promise<Buffer>
```
