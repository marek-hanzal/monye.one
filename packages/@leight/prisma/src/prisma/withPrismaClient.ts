import {
    type IContainer,
    ServiceContext
}                          from "@leight/container";
import {type PrismaClient} from "@prisma/client";

/**
 * Symbol for container usage of Prisma.
 */
export const $PrismaClient = Symbol.for("@leight-viv/prisma/PrismaClient");

export const withPrismaClient = (container: IContainer) => new ServiceContext<PrismaClient>(container, $PrismaClient).resolve();
