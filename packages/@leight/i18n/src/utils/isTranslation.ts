import {type IWithTranslation} from "../api";

export const isTranslation = (input?: any): input is IWithTranslation => {
    if (!input) {
        return false;
    }
    return "namespace" in input || "label" in input || "withLabel" in input || "values" in input;
};
