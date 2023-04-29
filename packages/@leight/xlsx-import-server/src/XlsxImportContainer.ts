import {type IContainer}     from "@leight/container";
import {type IImportService} from "@leight/import";
import {
    $MetaService,
    $MetaServiceConfig,
    $TabService,
    $TranslationService,
    $XlsxImportService,
    type IMetaService,
    type ITabService,
    type ITranslationService,
}                            from "@leight/xlsx-import";
import {
    MetaService,
    TabService,
    TranslationService,
    XlsxImportService
}                            from "./service";

export interface IXlsxImportContainer {
    TabService: ITabService;
    XlsxImportService: IImportService;
    MetaService: IMetaService;
    TranslationService: ITranslationService;
}

/**
 * Register all services of this packages into a target container.
 */
export const XlsxImportContainer = (container: IContainer): IXlsxImportContainer => {
    container
        .bindClass($TabService, TabService)
        .bindClass($MetaService, MetaService)
        .bindClass($XlsxImportService, XlsxImportService)
        .bindClass($TranslationService, TranslationService)
        .bindValue($MetaServiceConfig, {
            templates: "public/import",
        });

    return {
        get TabService() {
            return container.resolve<ITabService>($TabService);
        },
        get MetaService() {
            return container.resolve<IMetaService>($MetaService);
        },
        get TranslationService() {
            return container.resolve<ITranslationService>($TranslationService);
        },
        get XlsxImportService() {
            return container.resolve<IImportService>($XlsxImportService);
        },
    };
};
