import { Readable } from "node:stream";

export const streamOf = async <TItem = unknown>(
    stream: Readable,
    callback: (item: TItem) => Promise<void>
) => {
    for await (const item of stream) {
        await callback(item);
    }
};
