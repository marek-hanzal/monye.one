import "reflect-metadata";
import {container} from "tsyringe";
import {
    $ImportService,
    $MetaService,
    $TabService,
    $TranslationService,
    type IImportService,
    type IMetaService,
    type ITabService,
    type ITranslationService,
} from "@leight/xlsx-import";
import {ImportService, MetaService, TabService, TranslationService,} from "./service";

export interface IImportContainer {
    TabService: ITabService;
    ImportService: IImportService;
    MetaService: IMetaService;
    TranslationService: ITranslationService;
}

/**
 * Register all services of this packages into a target container.
 */
export const ImportContainer = (target: typeof container): IImportContainer => {
    target.register<ITabService>($TabService, {
        useClass: TabService,
    });
    target.register<IMetaService>($MetaService, {
        useClass: MetaService,
    });
    target.register<IImportService>($ImportService, {
        useClass: ImportService,
    });
    target.register<ITranslationService>($TranslationService, {
        useClass: TranslationService,
    });

    return {
        get TabService() {
            return target.resolve<ITabService>($TabService);
        },
        get ImportService() {
            return target.resolve<IImportService>($ImportService);
        },
        get MetaService() {
            return target.resolve<IMetaService>($MetaService);
        },
        get TranslationService() {
            return target.resolve<ITranslationService>($TranslationService);
        },
    };
};
