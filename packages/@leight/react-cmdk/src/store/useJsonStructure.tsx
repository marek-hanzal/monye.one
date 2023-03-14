import {createStoreContext} from "@leight/context-client";
import {JsonStructure}      from "../types";

export interface IJsonStructureStoreProps {
    readonly items: JsonStructure;

    setItems(items: JsonStructure): void;
}

export const {
                 Provider:         JsonStructureProvider,
                 useState:         useJsonStructureState,
                 useOptionalState: useOptionalJsonStructureState,
                 useStore:         useJsonStructureStore,
                 useOptionalStore: useOptionalJsonStructureStore,
             } = createStoreContext<IJsonStructureStoreProps>(
    (set) => ({
        items: [],
        setItems(items) {
            set({items});
        }
    }),
    "JsonStructureProvider",
    "Add JsonStructureProvider."
);
