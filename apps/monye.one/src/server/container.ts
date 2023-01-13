import {env}          from "@/monye.one/env/server.mjs";
import {PrismaClient} from "@prisma/client";
import "reflect-metadata";
import {
    container,
    instanceCachingFactory
}                     from "tsyringe";

container.register<PrismaClient>(PrismaClient, {
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
container.register("PrismaClient", {
    useToken: PrismaClient,
});

export {container} from "tsyringe";
