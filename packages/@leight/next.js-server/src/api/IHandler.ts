import { type IError } from "./IError";
import { type IHandlerProps } from "./IHandlerProps";
import { type IHrefQuery } from "@leight/core";

export interface IHandler<TData, THrefQuery extends IHrefQuery = IHrefQuery> {
    handler(props: IHandlerProps<THrefQuery>): Promise<TData | IError>;
}
