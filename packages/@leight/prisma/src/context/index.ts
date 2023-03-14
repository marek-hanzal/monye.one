import {
    type IContainer,
    ServiceContext
}                          from "@leight/container";
import {type PrismaClient} from "@prisma/client";
import {$PrismaClient}     from "../index";

export const PrismaServiceContext = (container: IContainer) => new ServiceContext<PrismaClient>(container, $PrismaClient);
