// import {env}                                          from "@/monye.one/env.mjs";
// import {IContainer}                                   from "@leight/container";
// import {Container}                                    from "@leight/container-server";
// import {$PrismaClient}                                from "@leight/prisma";
// import {withServerContainer as withLeightContainer}   from "@leight/viv-server";
// import {BootstrapLogger}                              from "@leight/winston";
// import {withServerContainer as withMonyeOneContainer} from "@monye.one/container-server";
// import {PrismaClient}                                 from "@monye.one/prisma";
//
// BootstrapLogger({
//     loggers: [
//         "auth",
//     ],
// });
//
// export const container = Container.create();
//
// export const MonyeOneContainer = ((container: IContainer) => {
//     container
//         .bindFactory($PrismaClient, () => {
//             return new PrismaClient({
//                 errorFormat: "pretty",
//                 log:
//                              env.NODE_ENV === "development"
//                                  ? [
//                                      // "query",
//                                      "error",
//                                      "warn"
//                                  ]
//                                  : ["error"],
//             });
//         }, {
//             scope: IContainer.Scope.SINGLETON,
//         });
//     withLeightContainer(container);
//     withMonyeOneContainer(container);
//
//     return {
//         get PrismaClient() {
//             return container.resolve<PrismaClient>($PrismaClient);
//         },
//     };
// })(container);
export {};
