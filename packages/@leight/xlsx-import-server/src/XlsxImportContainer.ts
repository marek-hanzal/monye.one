import "reflect-metadata";
import {
    $ImportService,
    $MetaService,
    $MetaServiceConfig,
    $TabService,
    $TranslationService,
    type IImportService,
    type IMetaService,
    type IMetaServiceConfig,
    type ITabService,
    type ITranslationService,
} from "@leight/xlsx-import";
import {type IContainer} from "@leight/container";
import {ImportService, MetaService, TabService, TranslationService} from "./service";

export interface IXlsxImportContainer {
    TabService: ITabService;
    ImportService: IImportService;
    MetaService: IMetaService;
    TranslationService: ITranslationService;
}

/**
 * Register all services of this packages into a target container.
 */
export const XlsxImportContainer = (container: IContainer): IXlsxImportContainer => {
    container.register<ITabService>($TabService, {
        useClass: TabService,
    });
    container.register<IMetaService>($MetaService, {
        useClass: MetaService,
    });
    container.register<IImportService>($ImportService, {
        useClass: ImportService,
    });
    container.register<ITranslationService>($TranslationService, {
        useClass: TranslationService,
    });
    container.register<IMetaServiceConfig>($MetaServiceConfig, {
        useValue: {
            templates: 'public/import',
        },
    })

    return {
        get TabService() {
            return container.resolve<ITabService>($TabService);
        },
        get ImportService() {
            return container.resolve<IImportService>($ImportService);
        },
        get MetaService() {
            return container.resolve<IMetaService>($MetaService);
        },
        get TranslationService() {
            return container.resolve<ITranslationService>($TranslationService);
        },
    };
};
