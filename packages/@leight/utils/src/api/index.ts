export type IHrefQuery = Record<string | number, unknown>;

export interface IHrefProps<TQuery extends IHrefQuery = IHrefQuery> {
    href: string;
    query?: TQuery;
}

export interface IToString {
    toString(): string;
}
