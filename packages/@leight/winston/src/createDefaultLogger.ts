import winston from "winston";
import { createConsole } from "./createConsole";
import { createDefaultMeta } from "./createDefaultMeta";
import { ILogLevel } from "./interface";

export const createDefaultLogger = (
    service: string,
    version: string,
    level: ILogLevel
) => ({
    level,
    format: winston.format.json(),
    defaultMeta: createDefaultMeta(version),
    transports: [createConsole()],
});
