import winston from "winston";

const { transports } = winston;
const { format } = winston;

export const createConsole = () =>
    new transports.Console({
        format: format.combine(format.colorize(), format.ms(), format.simple()),
    });
