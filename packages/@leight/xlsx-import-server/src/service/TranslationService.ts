import type {
    ITranslation,
    ITranslationService,
    IXlsxTranslation
} from "@leight/xlsx-import";
import {
    utils,
    type WorkBook
} from "xlsx";

export class TranslationService implements ITranslationService {
    async toTranslations(workbook: WorkBook): Promise<ITranslation[]> {
        const {translations} = workbook.Sheets;
        if (!translations) {
            return [];
        }
        return utils
            .sheet_to_json<IXlsxTranslation>(translations)
            .reduce<ITranslation[]>(
                (result, current) => {
                    return [
                        ...result,
                        {
                            from: {
                                source: [current.from],
                            },
                            to:   current.to,
                        }
                    ];
                },
                []
            );
    }

    translate(item: Record<string, string>, translations: ITranslation[]): Record<string, string> {
        const output: Record<string, string> = {...item};
        translations.forEach(({to,
                                  from: {
                                            source,
                                            concat
                                        }
                              }) => {
            output[to] = source.map(key => item[key] ?? "").filter(Boolean).join(concat);
        });
        return output;
    }
}
