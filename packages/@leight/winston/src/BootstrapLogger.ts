import winston from "winston";
import { createDefaultLogger } from "./createDefaultLogger";
import { type ILogLevel } from "./interface";

export interface IBootstrapLoggerRequest {
    loggers: string[];
    version?: string;
    level?: ILogLevel;
    withLoki?: boolean;
}

export const BootstrapLogger = ({
    loggers,
    version = "edge",
    level = "info",
}: IBootstrapLoggerRequest) => {
    return loggers.map((name) =>
        winston.loggers.add(name, createDefaultLogger(name, version, level))
    );
};
