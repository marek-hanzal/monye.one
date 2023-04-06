import {type IPackageType}           from "@leight/generator";
import {type IGenerator}             from "../../api";
import {generatorCommonEntitySchema} from "./generatorCommonEntitySchema";
import {generatorCommonSource}       from "./generatorCommonSource";
import {generatorCommonSourceSchema} from "./generatorCommonSourceSchema";

export interface IGeneratorCommonParams {
    /**
     * Package references (used for generating proper `import` statements
     */
    packages: {
        /**
         * Source package exporting "PrismaSchema" namespace containing "entity"
         */
        prisma: string;
    };
    /**
     * Entity name this generator works with
     */
    entity: string;
    /**
     * Specify extension of schemas
     */
    schemaEx?: {
        /**
         * Entity schema extension (target type should be ZodSchema)
         */
        entity: IPackageType;
    },
    /**
     * Provide fields generated for SortSchema
     */
    sorts?: string[];
    sourceEx?: {
        extends: IPackageType[];
    };
}

export const generatorCommon: IGenerator<IGeneratorCommonParams> = async props => {
    await Promise.all([
        generatorCommonSource(props),
        generatorCommonEntitySchema(props),
        generatorCommonSourceSchema(props),
    ]);
};
