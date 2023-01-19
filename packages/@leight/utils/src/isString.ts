import {default as isCoolString} from "is-string";

export const isString = (val: any): val is string => isCoolString(val);
