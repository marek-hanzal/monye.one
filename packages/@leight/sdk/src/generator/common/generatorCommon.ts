import {type IGenerator} from "../../api";
import {
    generatorCommonEntityPrismaSchema,
    type IGeneratorCommonEntityPrismaSchemaParams
}                        from "./generatorCommonEntityPrismaSchema";
import {
    generatorCommonEntitySchema,
    type IGeneratorCommonEntitySchemaParams
}                        from "./generatorCommonEntitySchema";
import {
    generatorCommonSource,
    type IGeneratorCommonSourceParams
}                        from "./generatorCommonSource";
import {
    generatorCommonSourceSchema,
    type IGeneratorCommonSourceSchemaParams
}                        from "./generatorCommonSourceSchema";

export interface IGeneratorCommonParams {
    PrismaEntity?: IGeneratorCommonEntityPrismaSchemaParams;
    EntitySchema?: IGeneratorCommonEntitySchemaParams;
    Source?: IGeneratorCommonSourceParams;
    SourceSchema?: IGeneratorCommonSourceSchemaParams;
}

export const generatorCommon: IGenerator<IGeneratorCommonParams> = async (
    {
        params: {
                    PrismaEntity,
                    EntitySchema,
                    Source,
                    SourceSchema,
                },
        ...     props
    }) => {
    await Promise.all([
        Source ? generatorCommonSource({
            ...props,
            params: Source,
        }) : undefined,
        PrismaEntity ? generatorCommonEntityPrismaSchema({
            ...props,
            params: PrismaEntity,
        }) : undefined,
        EntitySchema ? generatorCommonEntitySchema({
            ...props,
            params: EntitySchema,
        }) : undefined,
        SourceSchema ? generatorCommonSourceSchema({
            ...props,
            params: SourceSchema,
        }) : undefined,
    ]);
};
