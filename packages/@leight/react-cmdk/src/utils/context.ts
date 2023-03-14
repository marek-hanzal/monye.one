import {
    createContext,
    Dispatch,
    SetStateAction
} from "react";

export const SelectContext = createContext<{ selected: number }>({
    selected: 0,
});

export const PageContext = createContext<{
    setSearchPrefix?: Dispatch<SetStateAction<string[] | undefined>>;
    searchPrefix?: string[];
}>({
    searchPrefix: undefined,
});

export const OpenContext = createContext<{
    onChangeOpen: (value: boolean) => void;
}>({
    onChangeOpen: () => undefined,
});
