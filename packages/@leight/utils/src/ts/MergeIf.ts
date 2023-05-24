import {type CheckIfExtends} from "./utils";

export type MergeIf<TBase, TCheck, TExtends, TYes, TNo> =
    TBase
    & CheckIfExtends<TCheck, TExtends, TYes, TNo>;
