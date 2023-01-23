import { type IError } from "./IError";
import { type IHandlerProps } from "./IHandlerProps";
import { type IHrefQuery } from "@leight/core";

export interface IHandler<
    TBody = unknown,
    TData = unknown,
    THrefQuery extends IHrefQuery = IHrefQuery
> {
    handler(props: IHandlerProps<TBody, THrefQuery>): Promise<TData | IError>;
}
