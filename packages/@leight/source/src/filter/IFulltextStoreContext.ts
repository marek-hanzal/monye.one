import {
    type IStoreContext,
    type IStoreProps,
    type IUseState
} from "@leight/store";

export type IFulltextStoreProps = IStoreProps<{
    fulltext: string | null | undefined;

    setFulltext(fulltext?: string | null | undefined): void;
}>

export type IFulltextStoreContext = IStoreContext<IFulltextStoreProps>;
export type IUseFulltextState = IUseState<IFulltextStoreProps>;
