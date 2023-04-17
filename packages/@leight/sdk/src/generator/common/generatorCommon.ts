import {type IGenerator} from "../../api";
import {
    generatorCommonEntityPrismaSource,
    type IGeneratorCommonEntityPrismaSourceParams
}                        from "./generatorCommonEntityPrismaSource";
import {
    generatorCommonEntitySource,
    type IGeneratorCommonEntitySourceParams
}                        from "./generatorCommonEntitySource";

export interface IGeneratorCommonParams {
    PrismaSource?: IGeneratorCommonEntityPrismaSourceParams;
    EntitySource?: IGeneratorCommonEntitySourceParams;
}

export const generatorCommon: IGenerator<IGeneratorCommonParams> = async (
    {
        params: {
                    PrismaSource,
                    EntitySource,
                },
        ...     props
    }) => {
    await Promise.all([
        PrismaSource ? generatorCommonEntityPrismaSource({
            ...props,
            params: PrismaSource,
        }) : undefined,
        EntitySource ? generatorCommonEntitySource({
            ...props,
            params: EntitySource,
        }) : undefined,
    ]);
};
