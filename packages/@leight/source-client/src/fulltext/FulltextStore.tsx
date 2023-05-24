import {type IFulltextStoreProps} from "@leight/source";
import {createStore}              from "@leight/store-client";
import {
    type FC,
    type PropsWithChildren
}                                 from "react";

export const FulltextStore = createStore<IFulltextStoreProps>({
    state: () => (set) => ({
        fulltext: undefined,
        setFulltext(fulltext) {
            set({fulltext});
        },
    }),
    name:  "FulltextStoreContext",
});

export type IFulltextProviderProps = PropsWithChildren<{
    defaultFulltext?: string;
}>

export const FulltextProvider: FC<IFulltextProviderProps> = (
    {
        defaultFulltext,
        ...props
    }) => {
    return <FulltextStore.Provider
        defaults={{fulltext: defaultFulltext}}
        {...props}
    />;
};
