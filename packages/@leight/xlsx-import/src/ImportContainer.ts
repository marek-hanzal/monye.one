import {container} from "tsyringe";
import {
    $ImportService,
    $MetaService,
    $TabService,
    $TranslationService,
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
    target.register($TabService, {
        useClass: TabService,
    });
    target.register($MetaService, {
        useClass: MetaService,
    });
    target.register($ImportService, {
        useClass: ImportService,
    });
    target.register($TranslationService, {
        useClass: TranslationService,
    });
};
