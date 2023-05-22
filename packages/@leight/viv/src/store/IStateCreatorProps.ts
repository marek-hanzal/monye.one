import {type CheckIfExtends}  from "../utils";
import {type IStoreProps}     from "./IStoreProps";
import {type IStorePropsType} from "./IStorePropsType";

export type IStateCreatorProps<TStoreProps extends IStoreProps> =
    {
        defaults?: Partial<TStoreProps["Props$"]>;
    }
    & CheckIfExtends<TStoreProps["State"], IStorePropsType, {
    state: TStoreProps["State"];
}, {
    state?: never;
}>;
