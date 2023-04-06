import {withSourceFile}              from "@leight/generator-server";
import {normalize}                   from "node:path";
import {type IGenerator}             from "../../api";
import {type IGeneratorServerParams} from "./generatorServer";

export const generatorServerTrpcSource: IGenerator<IGeneratorServerParams> = async (
    {
        barrel,
        folder,
        params: {
                    entity,
                    packages,
                    sourceEx,
                    disabled = [],
                },
    }) => {
    if (disabled.includes("trpc-procedure")) {
        return;
    }
    withSourceFile()
        .withImports({
            imports: {
                "@leight/trpc-source-server": [
                    "withSourceProcedure",
                ],
            }
        })
        .withImports({
            imports: {
                [packages.schema]: [
                    `$${entity}Source`,
                    `${entity}QuerySchema`,
                    `type I${entity}SourceSchema`,
                ],
            },
        })
        .withImports(sourceEx?.package ? {
            imports: {
                [sourceEx.package]: [sourceEx.type],
            },
        } : undefined)
        .withConsts({
            exports: {
                [`${entity}SourceProcedure`]: {
                    body: `
withSourceProcedure<I${entity}SourceSchema>({
    source: $${entity}Source,
    schema: ${entity}QuerySchema,
})
                    `,
                },
            },
        })
        .saveTo({
            file: normalize(`${process.cwd()}/${folder}/ServerTrpc.ts`),
            barrel,
        });
};
