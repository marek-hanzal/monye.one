import {createStoreContext} from "@leight/context-client";
import {
    type IDayjs,
    type IDayjsInput
}                           from "@leight/i18n";
import dayjs, {
    ConfigType,
    Dayjs
}                           from "dayjs";

export interface IDayjsStoreProps {
    dayjs: IDayjs;

    wrap(input?: IDayjsInput | null, fallback?: IDayjsInput | null): Dayjs | null;

    toUtcDateTime({input, format, fallback}: IDayjsStoreProps.IToUtcDateTimeProps): string | null;

    toLocalDate(input?: IDayjsInput | null, fallback?: string): string;

    toLocalDateTime(input?: IDayjsInput | null, fallback?: string): string;
}

export namespace IDayjsStoreProps {
    export interface IToUtcDateTimeProps {
        input?: ConfigType | null;
        fallback?: string | null;
        format?: string;
    }
}

export const {
                 Provider:         DayjsProvider,
                 useState:         useDayjsState,
                 useOptionalState: useOptionalDayjsState,
                 useStore:         useDayjsStore,
                 useOptionalStore: useOptionalDayjsStore,
             } = createStoreContext<IDayjsStoreProps>(
    (set, get) => ({
        dayjs,
        wrap(input, fallback = null) {
            const {dayjs} = get();
            return input ? dayjs(input) : (fallback ? dayjs(fallback) : null);
        },
        toUtcDateTime({input, format, fallback = null}) {
            try {
                const {dayjs} = get();
                return input ? (dayjs(input) as any).utc().format(format) : fallback;
            } catch (e) {
                console.error("Dayjs does not have registered utc() plugin!", "https://day.org/docs/en/plugin/utc", e);
                return fallback;
            }
        },
        toLocalDate(input, fallback = "-") {
            const {dayjs} = get();
            return input ? dayjs(input).format("L") : fallback;
        },
        toLocalDateTime(input, fallback = "-") {
            const {dayjs} = get();
            return input ? dayjs(input).format("L LTS") : fallback;
        },
    }),
    "DayjsContext",
    "Add DayjsProvider."
);
