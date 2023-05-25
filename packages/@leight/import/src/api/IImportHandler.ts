import {z}                      from "@leight/utils";
import {type IImportBeginEvent} from "./IImportBeginEvent";
import {type IImportEndEvent}   from "./IImportEndEvent";

export interface IImportHandler<TItem, TParams> {
    begin?(event: IImportBeginEvent): Promise<void>;

    end?(event: IImportEndEvent): Promise<void>;

    handler(props: IImportHandler.IHandlerProps<TItem, TParams>): Promise<any>;

    validator(): z.ZodType;
}

export namespace IImportHandler {
    export interface IHandlerProps<TItem, TParams> {
        item: TItem;
        params: TParams;
    }
}
