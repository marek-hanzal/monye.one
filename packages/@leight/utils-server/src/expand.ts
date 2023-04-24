import {inspect} from "node:util";

export const expand = (expand: any) => {
    return inspect(expand, false, null, true);
}
