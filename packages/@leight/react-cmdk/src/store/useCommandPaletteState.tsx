import {createStoreContext} from "@leight/context-client";

export interface ICommandPaletteStoreProps {
    readonly page?: string;
    readonly isOpen: boolean;
    readonly search: string;

    setPage(page?: string): void;

    setIsOpen(isOpen: boolean): void;

    setSearch(search: string): void;
}

export const {
                 Provider:         CommandPaletteProvider,
                 useState:         useCommandPaletteState,
                 useOptionalState: useOptionalCommandPaletteState,
                 useStore:         useCommandPaletteStore,
                 useOptionalStore: useOptionalCommandPaletteStore,
             } = createStoreContext<ICommandPaletteStoreProps>(
    (set) => ({
        isOpen: false,
        search: "",
        setIsOpen(isOpen) {
            set({isOpen});
        },
        setPage(page) {
            set({page});
        },
        setSearch(search) {
            set({search});
        },
    }),
    "CommandPaletteProvider",
    "Add CommandPaletteProvider."
);
