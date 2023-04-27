import {type IGenerator}    from "../../api";
import {generatorSdkBarrel} from "../generatorSdkBarrel";
import {
    generatorClientForm,
    type IGeneratorClientFormParams
}                           from "./generatorClientForm";
import {
    generatorClientSelection,
    IGeneratorClientSelectionParams
}                           from "./generatorClientSelection";
import {
    generatorClientSourceProvider,
    type IGeneratorClientSourceProviderParams
}                           from "./generatorClientSourceProvider";
import {
    generatorClientSourceSelect,
    type IGeneratorClientSourceSelectParams
}                           from "./generatorClientSourceSelect";
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
    type IGeneratorClientTrpcSourceParams
}                           from "./generatorClientTrpcSource";

export interface IGeneratorClientSourceParams {
    SourceProvider?: IGeneratorClientSourceProviderParams;
    SourceStore?: IGeneratorClientSourceStoreParams;
    SourceTable?: IGeneratorClientSourceTableParams;
    Form?: IGeneratorClientFormParams;
    Selection?: IGeneratorClientSelectionParams;
    Select?: IGeneratorClientSourceSelectParams;
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
                    Selection,
                    Select,
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
        Selection ? generatorClientSelection({
            ...props,
            params: Selection,
        }) : undefined,
        Select ? generatorClientSourceSelect({
            ...props,
            params: Select,
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
