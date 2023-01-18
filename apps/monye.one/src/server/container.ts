import {env}                                 from "@/monye.one/env/server.mjs";
import {ServerContainer as $ServerContainer} from "@leight/core-server";
import {$PrismaClient}                       from "@leight/prisma";
import {UserContainer as $UserContainer}     from "@monye.one/user-server";
import {PrismaClient}                        from "@prisma/client";
import "reflect-metadata";
import {
    container,
    instanceCachingFactory
}                                            from "tsyringe";

export const MonyeOneContainer = ((target: typeof container) => {
    target.register<PrismaClient>($PrismaClient, {
        useFactory: instanceCachingFactory<PrismaClient>(() => {
            return new PrismaClient({
                errorFormat: "pretty",
                log:         env.NODE_ENV === "development" ? [
                    "query",
                    "error",
                    "warn"
                ] : ["error"],
            });
        }),
    });

    return {
        get PrismaClient() {
            return target.resolve<PrismaClient>($PrismaClient);
        }
    };
})((container));
export const ServerContainer   = $ServerContainer(container);
export const UserContainer     = $UserContainer(container);
