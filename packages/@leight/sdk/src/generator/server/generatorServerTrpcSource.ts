import {withSourceFile}              from "@leight/generator-server";
import {normalize}                   from "node:path";
import {type IGenerator}             from "../../api";
import {type IGeneratorServerParams} from "./generatorServer";

export const generatorServerTrpcSource: IGenerator<IGeneratorServerParams> = async (
    {
        barrel,
        folder,
        params: {
                    entities,
                    packages,
                },
    }) => {
    const file = withSourceFile();

    entities.forEach(({name: entity, sourceEx, packages: $packages, disabled = []}) => {
        if (disabled.includes("trpc-procedure")) {
            return;
        }

        const packageSchema = $packages?.schema || packages?.schema;

        file.withImports({
                imports: {
                    "@leight/trpc-source-server": [
                        "withSourceProcedure",
                    ],
                }
            })
            .withImports({
                imports: packageSchema ? {
                    [packageSchema]: [
                        `$${entity}Source`,
                        `${entity}QuerySchema`,
                        `type I${entity}SourceSchema`,
                    ],
                } : {},
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
            });
    });


    file.saveTo({
        file: normalize(`${process.cwd()}/${folder}/ServerTrpc.ts`),
        barrel,
    });
};
