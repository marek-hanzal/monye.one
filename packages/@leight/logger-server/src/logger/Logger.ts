import winston, {type LoggerOptions} from "winston";

export const Logger = (id: string, options?: LoggerOptions) => winston.loggers.get(id, options);
