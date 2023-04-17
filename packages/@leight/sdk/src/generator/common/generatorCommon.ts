import {type IGenerator} from "../../api";
import {
    generatorCommonEntityPrismaSource,
    type IGeneratorCommonEntityPrismaSourceParams
}                        from "./generatorCommonEntityPrismaSource";
import {
    generatorCommonEntitySchema,
    type IGeneratorCommonEntitySchemaParams
}                        from "./generatorCommonEntitySchema";

export interface IGeneratorCommonParams {
    PrismaEntity?: IGeneratorCommonEntityPrismaSourceParams;
    EntitySchema?: IGeneratorCommonEntitySchemaParams;
}

export const generatorCommon: IGenerator<IGeneratorCommonParams> = async (
    {
        params: {
                    PrismaEntity,
                    EntitySchema,
                },
        ...     props
    }) => {
    await Promise.all([
        PrismaEntity ? generatorCommonEntityPrismaSource({
            ...props,
            params: PrismaEntity,
        }) : undefined,
        EntitySchema ? generatorCommonEntitySchema({
            ...props,
            params: EntitySchema,
        }) : undefined,
    ]);
};
