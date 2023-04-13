import {isObject}      from "@leight/utils";
import {type DateTime} from "luxon";

export * from "./api";

export const isDateTime = (input: any): input is DateTime => {
    return isObject(input) && ("toJSDate" in input);
};

export * from "luxon";
