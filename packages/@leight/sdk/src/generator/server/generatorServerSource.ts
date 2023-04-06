import {withSourceFile}         from "@leight/generator-server";
import {normalize}              from "node:path";
import {IGenerator}             from "../../api";
import {IGeneratorServerParams} from "./generatorServer";

export const generatorServerSource: IGenerator<IGeneratorServerParams> = async (
    {
        barrel,
        folder,
        params: {
                    sourceEx,
                    packages,
                    entity,
                },
    }) => {
    withSourceFile()
        .withImports({
            imports: {
                [`${packages.schema}`]: [
                    `type I${entity}Source`,
                ],
            },
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
        })
        .saveTo({
            file: normalize(`${process.cwd()}/${folder}/ServerSource.ts`),
            barrel,
        });
};
