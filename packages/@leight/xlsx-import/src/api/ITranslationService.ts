import {type WorkBook}     from "xlsx";
import {type ITranslation} from "../schema";

/**
 * Service used to extract translations from the Excel sheet.
 */
export interface ITranslationService {
    toTranslations(workbook: WorkBook): Promise<ITranslation[]>;

    translate(item: Record<string, string>, translations: ITranslation[]): Record<string, string>;
}

export const $TranslationService = Symbol.for(
    "@leight/xlsx-import-server/ITranslationService"
);
