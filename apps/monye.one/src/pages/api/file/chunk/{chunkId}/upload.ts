import {Endpoint} from "@leight/next.js-server";

export const config = {
    api: {
        bodyParser: false,
    },
};

export default Endpoint<void>({
    async handler() {
        // nope
    }
});
