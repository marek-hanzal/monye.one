import {type IStoreProviderProps} from "@leight/context";
import {createStoreContext}       from "@leight/context-client";
import {type IFulltextStoreProps} from "@leight/source";
import {type FC}                  from "react";

export const FulltextStore = createStoreContext<IFulltextStoreProps>({
    state: () => (set) => ({
        fulltext: undefined,
        setFulltext(fulltext) {
            set({fulltext});
        },
    }),
    name:  "FulltextStoreContext",
});

export interface IFulltextProviderProps extends IStoreProviderProps<IFulltextStoreProps> {
    defaultFulltext?: string;
}

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
