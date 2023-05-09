import {type IStoreProps, type StoreApi} from "@leight/zustand";
import {type IStoreProviderComponent} from "./IStoreProvider";
import {type IUseState} from "./IUseState";
import {type IUseState$} from "./IUseState$";

/**
 * Typed set of generated components used for working with Store; Provider, states and the others otherwise
 * boilerplate code.
 */
export interface IStoreContext<TStoreProps extends IStoreProps> {
    name: string;
    Provider: IStoreProviderComponent<TStoreProps>;
    use: IUseState<TStoreProps>;
    use$: IUseState$<TStoreProps>;
    useStore: () => StoreApi<TStoreProps["StoreProps"]>;
    useStore$: () => StoreApi<TStoreProps["StoreProps"]> | null;
}
