import "reflect-metadata";
import {inject, injectable} from "tsyringe";
import {type WorkBook} from "xlsx";
import type {IMetaSchema, IMetaService, ITabService, ITranslationService,} from "@leight/xlsx-import";
import {$TabService, $TranslationService} from "@leight/xlsx-import";

@injectable()
export class MetaService implements IMetaService {
    constructor(
        @inject($TabService) protected tabService: ITabService,
        @inject($TranslationService)
        protected translationService: ITranslationService
    ) {
    }

    async toMeta(workbook: WorkBook): Promise<IMetaSchema> {
        return {
            tabs: await this.tabService.toTabs(workbook),
            translations: await this.translationService.toTranslations(
                workbook
            ),
        };
    }
}
