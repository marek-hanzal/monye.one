import {IError}             from "./IError";
import {type IHandlerProps} from "./IHandlerProps";

export interface IHandler<TData> {
    handler(props: IHandlerProps): Promise<TData | IError>;
}
