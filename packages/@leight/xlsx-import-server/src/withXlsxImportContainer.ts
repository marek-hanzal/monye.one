import {type IContainer} from "@leight/container";
import {
    $MetaService,
    $MetaServiceConfig,
    $TabService,
    $TranslationService,
    $XlsxImportService
}                        from "@leight/xlsx-import";
import {
    MetaService,
    TabService,
    TranslationService,
    XlsxImportService
}                        from "./service";

/**
 * Register all services of this packages into a target container.
 */
export const withXlsxImportContainer = (container: IContainer) => {
    container
        .bindClass($TabService, TabService)
        .bindClass($MetaService, MetaService)
        .bindClass($XlsxImportService, XlsxImportService)
        .bindClass($TranslationService, TranslationService)
        .bindValue($MetaServiceConfig, {
            templates: "public/import",
        });
};
