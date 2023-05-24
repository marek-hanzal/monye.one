import {
    DateTime,
    type IDateTimeStoreProps
}                    from "@leight/i18n";
import {createStore} from "@leight/store-client";
import {iso2locale}  from "./iso2locale";

export const DateTimeStore = createStore<IDateTimeStoreProps>({
    state: ({state}) => () => ({
        toLocalDate(date, fallback, opts = DateTime.DATE_MED) {
            return iso2locale(date, fallback, opts);
        },
        toLocalDateTime(date, fallback, opts = DateTime.DATETIME_MED) {
            return iso2locale(date, fallback, opts);
        },
        ...state,
    }),
    name:  "DateTimeStore",
    hint:  "Add DateTimeStore.Provider.",
});
