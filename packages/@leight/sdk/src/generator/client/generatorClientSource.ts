import {type IGenerator} from "../../api";
import {
    generatorClientSourceProvider,
    type IGeneratorClientSourceProviderParams
}                        from "./generatorClientSourceProvider";
import {
    generatorClientSourceStore,
    type IGeneratorClientSourceStoreParams
}                        from "./generatorClientSourceStore";
import {
    generatorClientSourceTable,
    type IGeneratorClientSourceTableParams
}                        from "./generatorClientSourceTable";

export interface IGeneratorClientSourceParams {
    SourceProvider?: IGeneratorClientSourceProviderParams;
    SourceStore?: IGeneratorClientSourceStoreParams;
    SourceTable?: IGeneratorClientSourceTableParams;
}

export const generatorClientSource: IGenerator<IGeneratorClientSourceParams> = async (
    {
        params: {
                    SourceProvider,
                    SourceStore,
                    SourceTable,
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
    ]);
};
