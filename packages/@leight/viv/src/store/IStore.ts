import {type StoreApi}       from "zustand";
import {type IStoreProps}    from "./IStoreProps";
import {type IStoreProvider} from "./IStoreProvider";
import {type IUseState}      from "./IUseState";
import {type IUseState$}     from "./IUseState$";

/**
 * Typed set of generated components used for working with Store; Provider, states and the others otherwise
 * boilerplate code.
 */
export interface IStore<TStoreProps extends IStoreProps> {
    name: string;
    Provider: IStoreProvider<TStoreProps>;
    use: IUseState<TStoreProps>;
    use$: IUseState$<TStoreProps>;
    useStore: () => StoreApi<TStoreProps["StoreProps"]>;
    useStore$: () => StoreApi<TStoreProps["StoreProps"]> | null;
}
