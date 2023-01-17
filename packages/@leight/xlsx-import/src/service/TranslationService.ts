import {injectable} from "tsyringe";
import {
    utils,
    type WorkBook
}                   from "xlsx";
import type {
    ITranslations,
    ITranslationService,
    IXlsxTranslation
}                   from "../api";

@injectable()
export class TranslationService implements ITranslationService {
    async toTranslations(workbook: WorkBook): Promise<ITranslations> {
        const translations = workbook.Sheets["translations"];
        if (!translations) {
            return {};
        }
        return utils.sheet_to_json<IXlsxTranslation>(translations).reduce<ITranslations>((obj, current) => {
            obj[current.from] = current.to;
            return obj;
        }, {});
    }
}
