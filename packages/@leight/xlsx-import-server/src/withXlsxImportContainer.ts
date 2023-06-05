import {type IContainer}    from "@leight/container";
import {
    $MetaService,
    $MetaServiceConfig,
    $TabService,
    $TranslationService,
    $XlsxImportService
}                           from "@leight/xlsx-import";
import {MetaService}        from "./service/MetaService";
import {TabService}         from "./service/TabService";
import {TranslationService} from "./service/TranslationService";
import {XlsxImportService}  from "./service/XlsxImportService";

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
