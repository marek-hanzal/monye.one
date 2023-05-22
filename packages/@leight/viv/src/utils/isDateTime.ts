import {type DateTime} from "luxon";
import {isObject}      from "./isObject";

export const isDateTime = (input: any): input is DateTime => {
    return isObject(input) && ("toJSDate" in input);
};
