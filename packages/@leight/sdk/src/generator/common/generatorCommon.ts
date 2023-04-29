import {type IGenerator}    from "../../api";
import {generatorSdkBarrel} from "../generatorSdkBarrel";
import {
    generatorCommonEntityPrismaSource,
    type IGeneratorCommonEntityPrismaSourceParams
}                           from "./generatorCommonEntityPrismaSource";
import {
    generatorCommonEntitySource,
    type IGeneratorCommonEntitySourceParams
}                           from "./generatorCommonEntitySource";
import {
    generatorForm,
    type IGeneratorFormParams
}                           from "./generatorForm";

export interface IGeneratorCommonParams {
    PrismaSource?: IGeneratorCommonEntityPrismaSourceParams;
    EntitySource?: IGeneratorCommonEntitySourceParams;
    Form?: IGeneratorFormParams;
}

export const generatorCommon: IGenerator<IGeneratorCommonParams> = async (
    {
        params: {
                    PrismaSource,
                    EntitySource,
                    Form,
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
        Form ? generatorForm({
            ...props,
            params: Form,
        }) : undefined,
    ]);
    await generatorSdkBarrel({
        ...props,
        barrel: true,
        params: {},
    });
};
