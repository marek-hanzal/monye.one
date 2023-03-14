export * from "./context";

/**
 * Symbol for container usage of Prisma.
 */
export const $PrismaClient = Symbol.for("@leight/prisma/PrismaClient");
export {
    PrismaClient,
}        from "@prisma/client";

export * as PrismaSchema from "./schema";
