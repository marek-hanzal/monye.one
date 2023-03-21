import dayjs, {type ConfigType} from "dayjs";

export * from "./IWithLocale";
export * from "./IWithTranslation";
export * from "./IWithTranslator";

export type IDayjs = typeof dayjs;
export type IDayjsInput = ConfigType;
