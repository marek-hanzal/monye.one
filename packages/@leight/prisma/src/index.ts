import {Prisma} from "@prisma/client";

/**
 * Symbol for container usage of Prisma.
 */
export const $PrismaClient = Symbol.for("@leight/prisma/PrismaClient");

export const decimalOf = (value: any): number => {
    return (new Prisma.Decimal(value)).toNumber();
};

export {PrismaClient} from "@prisma/client";
export *              from "./context";
export *              from "./schema";
