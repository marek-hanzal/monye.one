import {type WorkBook} from "xlsx";
import {type ITranslationSchema} from "../schema";

/**
 * Service used to extract translations from the Excel sheet.
 */
export interface ITranslationService {
    toTranslations(workbook: WorkBook): Promise<ITranslationSchema[]>;
}

export const $TranslationService = Symbol.for(
    "@leight/xlsx-import-server/TranslationService"
);