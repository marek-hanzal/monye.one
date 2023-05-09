import {type IStoreContext} from "@leight/context";
import {type IQueryStoreProps} from "../query";
import {type Source} from "./Source";

/**
 * Client side Source tools.
 */
export interface ISource<TSource extends Source = Source> {
    repository: TSource["Type"]["UseRepository"];
    query: IStoreContext<IQueryStoreProps<TSource["Schema"]["Mapper"]>>;
}
