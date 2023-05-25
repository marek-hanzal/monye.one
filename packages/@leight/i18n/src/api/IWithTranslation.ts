import {type TranslationValues} from "next-intl";

export interface IWithTranslation {
    /**
     * Base translation namespace (basically part of a label).
     */
    namespace?: string;
    /**
     * Base translation label.
     */
    label?: string;
    /**
     * Append user-specific translation label.
     */
    withLabel?: string;
    /**
     * Expand values within a translation.
     */
    values?: TranslationValues;
}
