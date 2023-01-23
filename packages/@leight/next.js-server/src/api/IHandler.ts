import { type IError } from "./IError";
import { type IHandlerProps } from "./IHandlerProps";
import { type IHrefQuery } from "@leight/core";
import { container } from "tsyringe";

export interface IHandler<
    TBody = unknown,
    TData = unknown,
    THrefQuery extends IHrefQuery = IHrefQuery
> {
    container: typeof container;

    handler(props: IHandlerProps<TBody, THrefQuery>): Promise<TData | IError>;
}
