import {container}          from "@/monye.one/server/container";
import {Endpoint}           from "@leight/next.js-server";
import type {ImportService} from "@leight/xlsx-import";
import {$ImportService}     from "@leight/xlsx-import";

export default Endpoint<string>({
    async handler() {
        // just shit here
        return container.resolve<ImportService>($ImportService).fun();
    }
});
