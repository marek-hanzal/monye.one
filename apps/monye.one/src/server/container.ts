import {env}                                 from "@/monye.one/env/server.mjs";
import {ServerContainer as $ServerContainer} from "@leight/core-server";
import {$PrismaClient}                       from "@leight/prisma";
import {PrismaClient}                        from "@prisma/client";
import "reflect-metadata";
import {
	container,
	instanceCachingFactory
}                                            from "tsyringe";

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
container.register($PrismaClient, {
	useToken: PrismaClient,
});

export const ServerContainer = $ServerContainer(container);

export {container} from "tsyringe";
