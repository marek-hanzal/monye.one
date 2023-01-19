import {compile} from "path-to-regexp";

export type IHrefQuery = Record<string | number, any>;

export interface IHrefProps<TQuery extends IHrefQuery = IHrefQuery> {
    href: string;
    query?: TQuery;
}

export const toHref = <TQuery extends IHrefQuery = IHrefQuery>({href, query}: IHrefProps<TQuery>): string => {
    return href === "/" ? href : compile(href.replace(/\[(.*?)\]/g, ":$1").replace(/{(.*?)}/g, ":$1"))(query || {});
};
