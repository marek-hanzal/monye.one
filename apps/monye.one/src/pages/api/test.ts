import { container } from "@/monye.one/server/container";
import { Endpoint } from "@leight/next.js-server";

export default Endpoint<string>({
    container,
    async handler() {
        return "ok";
    },
});
