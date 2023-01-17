import {IImportBeginEvent} from "./IImportBeginEvent";
import {IImportEndEvent}   from "./IImportEndEvent";

export interface IImportHandler<TItem> {
    begin?(event: IImportBeginEvent): Promise<void>;

    end?(event: IImportEndEvent): Promise<void>;

    handler(item: TItem): Promise<any>;
}
