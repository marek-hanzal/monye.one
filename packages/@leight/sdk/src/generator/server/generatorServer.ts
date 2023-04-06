import {type IPackageType}         from "@leight/generator";
import {type IGenerator}           from "../../api";
import {generatorServerBaseSource} from "./generatorServerBaseSource";
import {generatorServerSource}     from "./generatorServerSource";
import {generatorServerTrpcSource} from "./generatorServerTrpcSource";

export interface IGeneratorServerParams {
    /**
     * Package references (used for generating proper `import` statements
     */
    packages?: {
        /**
         * Source package exporting "PrismaSchema" namespace containing "entity"
         */
        prisma?: string;
        /**
         * Reference to package with generated Schemas (entity/sort/filter/...)
         */
        schema?: string;
    };
    entities: {
        /**
         * Entity name this generator works with
         */
        name: string;
        /**
         * Prisma repository (prismaClient.${prisma})
         */
        prisma?: string;
        /**
         * Which parts of the generator are disabled (not used)
         */
        disabled?: ("trpc-procedure")[];
        /**
         * Optional extension of the source (if there are some custom methods)
         */
        sourceEx?: IPackageType;
        packages?: {
            schema?: string;
        };
    }[];
    /**
     * File header, generated as a comment
     */
    header?: string;
}

export const generatorServer: IGenerator<IGeneratorServerParams> = async props => {
    await Promise.all([
        generatorServerBaseSource(props),
        generatorServerSource(props),
        generatorServerTrpcSource(props),
    ]);
};
