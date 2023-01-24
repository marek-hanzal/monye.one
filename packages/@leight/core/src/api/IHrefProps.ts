import { IHrefQuery } from "./IHrefQuery";

export interface IHrefProps<TQuery extends IHrefQuery = IHrefQuery> {
    href: string;
    query?: TQuery;
}
