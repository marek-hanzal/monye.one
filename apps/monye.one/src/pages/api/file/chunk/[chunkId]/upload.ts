import {container}           from "@/monye.one/server/container";
import {ChunkUploadEndpoint} from "@leight/file-server";

export const config = {
    api: {
        bodyParser: false,
    },
};

export default ChunkUploadEndpoint(container);
