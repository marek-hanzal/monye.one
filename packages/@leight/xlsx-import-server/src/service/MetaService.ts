import type {
    IMeta,
    IMetaService,
    IMetaServiceConfig,
    ITabService,
    ITranslationService,
}               from "@leight/xlsx-import";
import {
    $MetaServiceConfig,
    $TabService,
    $TranslationService,
    MetaSchema
}               from "@leight/xlsx-import";
import {jsonOf} from "@leight/zod";
import fs       from "node:fs";

export class MetaService implements IMetaService {
    static inject = [
        $TabService,
        $TranslationService,
        $MetaServiceConfig,
    ];

    constructor(
        protected tabService: ITabService,
        protected translationService: ITranslationService,
        protected metaServiceConfig: IMetaServiceConfig,
    ) {
    }

    async toMeta({workbook, name}: IMetaService.MetaProps): Promise<IMeta> {
        const tabs         = await this.tabService.toTabs(workbook);
        const translations = await this.translationService.toTranslations(
            workbook
        );
        const type         = name.match(/\(([a-z0-9]+)\)/)?.[1];
        const template     = `${this.metaServiceConfig.templates}/${type}.json`;

        if (!tabs.length && type && fs.existsSync(template)) {
            return jsonOf(MetaSchema, fs.readFileSync(template, "utf8"));
        }

        return {
            tabs,
            translations,
        };
    }
}
