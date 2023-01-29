import {ServerContainer as $ServerContainer} from "@leight/container-server";
import {$PrismaClient} from "@leight/prisma";
import {PrismaClient} from "@prisma/client";
import "reflect-metadata";
import {container, instanceCachingFactory} from "tsyringe";

export const MonyeOneContainer = ((target: typeof container) => {
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
export const ServerContainer = $ServerContainer(container);
export { container } from "tsyringe";
