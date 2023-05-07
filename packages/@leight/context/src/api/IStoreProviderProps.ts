import {
    type IStateCreatorProps,
    type IStoreApi,
    type IStoreProps
}                               from "@leight/zustand";
import {type IProviderChildren} from "./IProviderChildren";

export type IStoreProviderProps<TStoreProps extends IStoreProps> =
    {
        children: IProviderChildren<IStoreApi<TStoreProps>>;
    }
    & IStateCreatorProps<TStoreProps>;
