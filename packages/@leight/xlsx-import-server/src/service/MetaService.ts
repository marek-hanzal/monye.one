import "reflect-metadata";
import {inject, injectable} from "tsyringe";
import type {
    IMetaSchema,
    IMetaService,
    IMetaServiceConfig,
    ITabService,
    ITranslationService,
} from "@leight/xlsx-import";
import {$MetaServiceConfig, $TabService, $TranslationService, MetaSchema} from "@leight/xlsx-import";
import fs from "fs";

@injectable()
export class MetaService implements IMetaService {
    constructor(
        @inject($TabService) protected tabService: ITabService,
        @inject($TranslationService) protected translationService: ITranslationService,
        @inject($MetaServiceConfig) protected metaServiceConfig: IMetaServiceConfig,
    ) {
    }

    async toMeta({workbook, name}: IMetaService.MetaProps): Promise<IMetaSchema> {
        const tabs = await this.tabService.toTabs(workbook);
        const translations = await this.translationService.toTranslations(
            workbook
        );
        const type = name.match(/\(([a-z0-9]+)\)/)?.[1];
        const template = `${this.metaServiceConfig.templates}/${type}.json`;

        if (!tabs.length && type && fs.existsSync(template)) {
            const meta = JSON.parse(fs.readFileSync(template, 'utf8'));
            MetaSchema.parse(meta);
            return meta;
        }

        return {
            tabs,
            translations,
        };
    }
}
