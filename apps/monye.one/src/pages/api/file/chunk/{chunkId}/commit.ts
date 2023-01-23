import { Endpoint } from "@leight/next.js-server";

export default Endpoint<void, { chunkId: string }>({
    async handler({ query: { chunkId } }) {
        console.log("Commited", chunkId);
        // nope
    },
});
