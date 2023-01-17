import {ITab}          from "./ITab";
import {ITranslations} from "./ITranslations";

/**
 * Import metadata; tabs for import, general translations and so on.
 */
export interface IMeta {
    tabs: ITab[];
    translations: ITranslations;
}
