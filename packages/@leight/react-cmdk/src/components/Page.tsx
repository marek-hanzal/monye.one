import React, {
    PropsWithChildren,
    useContext,
    useEffect
} from "react";
import {
    useCommandPaletteState,
    useJsonStructureState
} from "../store";
import {
    filterItems,
    PageContext,
    renderJsonStructure,
} from "../utils";

export type PageProps = PropsWithChildren<{
    searchPrefix?: string[];
    onEscape?: () => void;
    id: string;
    backTo?: string;
}>;

export default function Page(
    {
        searchPrefix,
        onEscape,
        backTo,
        children,
        id,
    }: PageProps) {
    const items                              = useJsonStructureState(({items}) => items);
    const {page, search, setPage, setIsOpen} = useCommandPaletteState(({search, page, setPage, setIsOpen}) => ({search, page, setPage, setIsOpen}));
    const {setSearchPrefix}                  = useContext(PageContext);
    onEscape                                 = onEscape || (() => {
        backTo && setPage(backTo);
        !backTo && setIsOpen(false);
    });

    const isActive = page === id;

    useEffect(() => {
        if (onEscape && isActive) {
            function handleKeyDown(e: KeyboardEvent) {
                if (e.key === "Escape") {
                    e.preventDefault();
                    e.stopPropagation();
                    onEscape?.();
                } else if (e.key === "Backspace" && !search) {
                    e.preventDefault();
                    e.stopPropagation();
                    onEscape?.();
                }
            }

            document.addEventListener("keydown", handleKeyDown);

            return () => {
                document.removeEventListener("keydown", handleKeyDown);
            };
        }
    }, [
        isActive,
        search
    ]);

    useEffect(() => {
        isActive && setSearchPrefix?.(searchPrefix);
    }, [
        searchPrefix,
        isActive,
        setSearchPrefix,
    ]);

    return isActive ? <>
        {renderJsonStructure(filterItems(items, search))}
        {children}
    </> : null;
}
