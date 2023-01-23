import { FileContainer as $FileContainer } from "@leight/file-server";
import { ImportContainer as $ImportContainer } from "@leight/xlsx-import-server";
import { container } from "tsyringe";

export const ServerContainer = (target: typeof container) => {
    return {
        get FileContainer() {
            return $FileContainer(target);
        },
        get ImportContainer() {
            return $ImportContainer(target);
        },
    };
};
