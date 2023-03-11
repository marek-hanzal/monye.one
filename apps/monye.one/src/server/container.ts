import {
    type IContainer,
    PumpIt,
    wrapContainer
}                                                    from "@leight/container";
import {ServerContainer as $LeightServerContainer}   from "@leight/container-server";
import {$PrismaClient}                               from "@leight/prisma";
import {ServerContainer as $MonyeOneServerContainer} from "@monye.one/container-server";
import {PrismaClient}                                from "@prisma/client";

export const container = new PumpIt();

export const MonyeOneContainer = ((container: IContainer) => {
    wrapContainer(container);
    container.bindFactory($PrismaClient, () => {
        console.log("New Prisma stuff");
        return new PrismaClient({
            errorFormat: "pretty",
            // log:
            //     env.NODE_ENV === "development"
            //         ? ["query", "error", "warn"]
            //         : ["error"],
        });
    });

    return {
        get PrismaClient() {
            return container.resolve<PrismaClient>($PrismaClient);
        },
    };
})(container);

export const LeightServerContainer   = $LeightServerContainer(container);
export const MonyeOneServerContainer = $MonyeOneServerContainer(container);
