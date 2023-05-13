import {type IContainer}   from "@leight/container";
import {ServiceContext}    from "@leight/container-server";
import {type PrismaClient} from "@prisma/client";
import {$PrismaClient}     from "../index";

export const PrismaServiceContext = (container: IContainer) => new ServiceContext<PrismaClient>(container, $PrismaClient);
