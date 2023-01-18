import {type WorkBook}      from "xlsx";
import {type ITranslations} from "./ITranslations";

/**
 * Service used to extract translations from the Excel sheet.
 */
export interface ITranslationService {
    toTranslations(workbook: WorkBook): Promise<ITranslations>;
}

export const $TranslationService = Symbol.for("@leight/xlsx-import-server/TranslationService");
