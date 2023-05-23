import {type MergeIf}         from "../utils";
import {type IStoreProps}     from "./IStoreProps";
import {type IStorePropsType} from "./IStorePropsType";

export type IStateCreatorProps<TStoreProps extends IStoreProps> = MergeIf<
    {
        defaults?: Partial<TStoreProps["Props$"]>;
    },
    TStoreProps["State"],
    IStorePropsType,
    {
        state: TStoreProps["State"];
    },
    {
        state?: never;
    }
>
