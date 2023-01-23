import { container } from "@/monye.one/server/container";
import { Endpoint } from "@leight/next.js-server";
import { TokenServiceUtils } from "@leight/user";

export default Endpoint<string>({
    container,
    async handler({ container }) {
        console.log(
            "tokens",
            TokenServiceUtils.resolve(container).hasAny(["token1"]),
            TokenServiceUtils.resolve(container).hasAny(["nope"])
        );
        return "ok";
    },
});
