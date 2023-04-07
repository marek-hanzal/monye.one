import {type IGenerator} from "../../api";
import {
    generatorCommonEntityPrismaSchema,
    type IGeneratorCommonEntityPrismaSchemaParams
}                        from "./generatorCommonEntityPrismaSchema";
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
    Source?: IGeneratorCommonSourceParams;
    SourceSchema?: IGeneratorCommonSourceSchemaParams;
}

export const generatorCommon: IGenerator<IGeneratorCommonParams> = async (
    {
        params: {
                    PrismaEntity,
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
        SourceSchema ? generatorCommonSourceSchema({
            ...props,
            params: SourceSchema,
        }) : undefined,
    ]);
};
