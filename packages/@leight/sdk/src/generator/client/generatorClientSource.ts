import {type IGenerator}    from "../../api";
import {generatorSdkBarrel} from "../generatorSdkBarrel";
import {
    generatorClientForm,
    type IGeneratorClientFormParams
}                           from "./generatorClientForm";
import {
    generatorClientSourceProvider,
    type IGeneratorClientSourceProviderParams
}                           from "./generatorClientSourceProvider";
import {
    generatorClientSourceStore,
    type IGeneratorClientSourceStoreParams
}                           from "./generatorClientSourceStore";
import {
    generatorClientSourceTable,
    type IGeneratorClientSourceTableParams
}                           from "./generatorClientSourceTable";
import {
    generatorClientTrpcSource,
    IGeneratorClientTrpcSourceParams
}                           from "./generatorClientTrpcSource";

export interface IGeneratorClientSourceParams {
    SourceProvider?: IGeneratorClientSourceProviderParams;
    SourceStore?: IGeneratorClientSourceStoreParams;
    SourceTable?: IGeneratorClientSourceTableParams;
    Form?: IGeneratorClientFormParams;
    Trpc?: IGeneratorClientTrpcSourceParams;
}

export const generatorClientSource: IGenerator<IGeneratorClientSourceParams> = async (
    {
        params: {
                    SourceProvider,
                    SourceStore,
                    SourceTable,
                    Form,
                    Trpc,
                },
        ...     props
    }) => {
    await Promise.all([
        SourceProvider ? generatorClientSourceProvider({
            ...props,
            params: SourceProvider,
        }) : undefined,
        SourceStore ? generatorClientSourceStore({
            ...props,
            params: SourceStore,
        }) : undefined,
        SourceTable ? generatorClientSourceTable({
            ...props,
            params: SourceTable,
        }) : undefined,
        Form ? generatorClientForm({
            ...props,
            params: Form,
        }) : undefined,
        Trpc ? generatorClientTrpcSource({
            ...props,
            params: Trpc,
        }) : undefined,
    ]);
    await generatorSdkBarrel({
        ...props,
        barrel: true,
        params: {},
    });
};
