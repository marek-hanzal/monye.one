import "reflect-metadata";
import {injectable} from "tsyringe";
import {utils, type WorkBook} from "xlsx";
import type {ITranslationSchema, ITranslationService, IXlsxTranslation,} from "@leight/xlsx-import";

@injectable()
export class TranslationService implements ITranslationService {
    async toTranslations(workbook: WorkBook): Promise<ITranslationSchema[]> {
        const {translations} = workbook.Sheets;
        if (!translations) {
            return [];
        }
        return utils
            .sheet_to_json<IXlsxTranslation>(translations)
            .reduce<ITranslationSchema[]>(
                (result, current) => {
                    return [...result, {
                        from: {
                            source: [current.from],
                        },
                        to: current.to,
                    }];
                },
                []
            );
    }
}
