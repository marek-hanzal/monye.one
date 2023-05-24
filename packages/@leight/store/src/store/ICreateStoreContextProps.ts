import {type IStateCreator}    from "./IStateCreator";
import {type IStoreProps} from "./IStoreProps";

export interface ICreateStoreContextProps<TStoreProps extends IStoreProps> {
    state: IStateCreator<TStoreProps>,
    name: string,
    hint?: string
}
