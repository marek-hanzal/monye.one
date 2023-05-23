import {type StoreApi}       from "zustand";
import {type IStoreProps}    from "./IStoreProps";
import {type IStoreProvider} from "./IStoreProvider";
import {type IUseState}      from "./IUseState";
import {type IUseState$}     from "./IUseState$";

/**
 * Typed set of generated components used for working with Store; Provider, states and the others otherwise
 * boilerplate code.
 */
export interface IStoreContext<TStoreProps extends IStoreProps> {
    name: string;
    Provider: IStoreProvider<TStoreProps>;
    useState: IUseState<TStoreProps>;
    useState$: IUseState$<TStoreProps>;
    useStore: () => StoreApi<TStoreProps["StoreProps"]>;
    useStore$: () => StoreApi<TStoreProps["StoreProps"]> | null;
}
