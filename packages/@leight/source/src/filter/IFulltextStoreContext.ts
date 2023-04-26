import {
    type IStoreContext,
    type IUseState
}                         from "@leight/context";
import {type IStoreProps} from "@leight/zustand";

export type IFulltextStoreProps = IStoreProps<{
    fulltext: string | null | undefined;

    setFulltext(fulltext?: string | null | undefined): void;
}>

export type IFulltextStoreContext = IStoreContext<IFulltextStoreProps>;
export type IUseFulltextState = IUseState<IFulltextStoreProps>;
