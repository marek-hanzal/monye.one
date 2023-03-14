import {isString}               from "@leight/utils";
import {useHotkeys}             from "@mantine/hooks";
import React, {
    Children,
    ReactNode
}                               from "react";
import CommandPalette           from "../components/CommandPalette";
import {useCommandPaletteState} from "../store";
import {JsonStructure}          from "../types";

export function getItemIndex(
    items: JsonStructure,
    id: string,
    startIndex: number = 0
) {
    return (
        items
            .map((list) => list.items)
            .reduce((a, b) => a.concat(b))
            .findIndex((i) => i.id === id) + startIndex
    );
}

export function filterItems(
    items: JsonStructure,
    search: string,
    {
        filterOnListHeading,
    }: {
        filterOnListHeading: boolean;
    } = {
        filterOnListHeading: true,
    }
) {
    return items
        .filter((list) => {
            const listHasMatchingItem = list.items.some(
                (item) =>
                    doesChildMatchSearch(search, item.children) ||
                    doesKeywordsMatchSearch(search, item.keywords?.filter(isString) ?? [])
            );

            return filterOnListHeading
                ? list.heading?.toLowerCase().includes(search.toLowerCase()) ||
                listHasMatchingItem
                : listHasMatchingItem;
        })
        .map((list) => {
            const matchingItems = list.items.filter(
                (item) =>
                    doesChildMatchSearch(search, item.children) ||
                    doesKeywordsMatchSearch(search, item.keywords?.filter(isString) ?? [])
            );

            return {
                ...list,
                items: filterOnListHeading
                           ? matchingItems.length
                        ? matchingItems
                        : list.items
                           : matchingItems,
            };
        });
}

function doesChildMatchSearch(search: string, children?: ReactNode) {
    return children
        ? getLabelFromChildren(children)
            .toLowerCase()
            .includes(search.toLowerCase())
        : false;
}

function doesKeywordsMatchSearch(search: string, keywords: string[]) {
    return keywords.includes("*")
        ? true
        : keywords.some((keyword) =>
            keyword.toLowerCase().includes(search.toLowerCase())
        );
}

function getLabelFromChildren(children: ReactNode) {
    let label = "";

    Children.map(children, (child) => {
        if (typeof child === "string") {
            label += child;
        }
    });

    return label;
}

export function classNames(
    ...classes: Array<string | null | boolean | undefined>
) {
    return classes.filter(Boolean).join(" ");
}

export function renderJsonStructure(jsonStructure: JsonStructure) {
    return jsonStructure.map((list) => (
        <CommandPalette.List heading={list.heading} key={list.id}>
            {list.items.map(({id, ...rest}) => (
                <CommandPalette.ListItem
                    index={getItemIndex(jsonStructure, id)}
                    key={id}
                    {...rest}
                />
            ))}
        </CommandPalette.List>
    ));
}

export function useCommandPaletteHotkey(hotkey: string = "mod+k") {
    const {isOpen, setIsOpen} = useCommandPaletteState(({isOpen, setIsOpen}) => ({isOpen, setIsOpen}));
    useHotkeys([
        [
            hotkey,
            () => setIsOpen(!isOpen),
        ],
    ]);
}