import {type IStoreProps} from "./IStoreProps";

/**
 * Use state of a store with an optional state selector
 */
export interface IUseState$<TStoreProps extends IStoreProps> {
    <U>(selector: (state: TStoreProps["StoreProps"] | null) => U): U;

    (): TStoreProps["StoreProps"] | null;
}
