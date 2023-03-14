import type {ButtonProps} from "./components/ListItem";

export type {ButtonProps} from "./components/ListItem";

export type JsonStructure = Array<{
    items: Array<JsonStructureItem>;
    heading?: string;
    id: string;
}>;

export type JsonStructureItem = Omit<
    ButtonProps & { id: string },
    "index"
>;
