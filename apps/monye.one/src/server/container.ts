import {ServerContainer as $LeightServerContainer} from "@leight/container-server";
import {ServerContainer as $MonyeOneServerContainer} from '@monye.one/container-server';
import {$PrismaClient} from "@leight/prisma";
import {PrismaClient} from "@prisma/client";
import "reflect-metadata";
import {container, instanceCachingFactory} from "tsyringe";
import {type IContainer, wrapContainer} from "@leight/container";

export const MonyeOneContainer = ((target: IContainer) => {
    wrapContainer(target);
    target.register<PrismaClient>($PrismaClient, {
        useFactory: instanceCachingFactory<PrismaClient>(() => {
            return new PrismaClient({
                errorFormat: "pretty",
                // log:
                //     env.NODE_ENV === "development"
                //         ? ["query", "error", "warn"]
                //         : ["error"],
            });
        }),
    });

    return {
        get PrismaClient() {
            return target.resolve<PrismaClient>($PrismaClient);
        },
    };
})(container);
export const LeightServerContainer = $LeightServerContainer(container);
export const MonyeOneServerContainer = $MonyeOneServerContainer(container);
export {container} from "tsyringe";
