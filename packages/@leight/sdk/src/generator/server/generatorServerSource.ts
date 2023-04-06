import {withSourceFile}              from "@leight/generator-server";
import {normalize}                   from "node:path";
import {type IGenerator}             from "../../api";
import {type IGeneratorServerParams} from "./generatorServer";

export const generatorServerSource: IGenerator<IGeneratorServerParams> = async (
    {
        barrel,
        folder,
        params: {
                    packages,
                    entities,
                },
    }) => {
    const file = withSourceFile();

    entities.forEach(({name: entity, sourceEx, packages: $packages}) => {
        const packageSchema = $packages?.schema || packages?.schema;

        file.withImports({
                imports: packageSchema ? {
                    [packageSchema]: [
                        `type I${entity}Source`,
                    ],
                } : {},
            })
            .withImports(sourceEx?.type ? undefined : {
                imports: {
                    "./ServerBaseSource": [
                        `${entity}BaseSource`,
                    ],
                },
            })
            .withImports(sourceEx?.package ? {
                imports: {
                    [sourceEx.package]: [
                        sourceEx.type,
                    ],
                },
            } : undefined)
            .withClasses({
                exports: {
                    [`${entity}Source`]: {
                        extends:    sourceEx?.type ? sourceEx.type : `${entity}BaseSource`,
                        implements: `I${entity}Source`,
                    },
                },
            });
    });

    file.saveTo({
        file: normalize(`${process.cwd()}/${folder}/ServerSource.ts`),
        barrel,
    });
};
