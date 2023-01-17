import {
    inject,
    injectable
}                      from "tsyringe";
import {type WorkBook} from "xlsx";
import type {
    IMeta,
    IMetaService,
    ITabService,
    ITranslationService
}                      from "../api";
import {
    $TabService,
    $TranslationService
}                      from "../api";

@injectable()
export class MetaService implements IMetaService {
    constructor(
        @inject($TabService) protected tabService: ITabService,
        @inject($TranslationService) protected translationService: ITranslationService
    ) {
    }

    async toMeta(workbook: WorkBook): Promise<IMeta> {
        return {
            tabs:         await this.tabService.toTabs(workbook),
            translations: await this.translationService.toTranslations(workbook),
        };
    }
}
