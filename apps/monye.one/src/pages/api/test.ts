import {Endpoint} from "@leight/next.js-server";

export default Endpoint<string>({
	async handler() {
		return "ok";
	}
});
