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
}                  from "./api";
import {
    ImportService,
    MetaService,
    TabService,
    TranslationService
}                  from "./service";

/**
 * Register all services of this packages into a target container.
 */
export const ImportContainer = (target: typeof container) => {
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
            return target.resolve<IMetaService>($TranslationService);
        },
    };
};