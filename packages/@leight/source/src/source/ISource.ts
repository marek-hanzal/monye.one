import {type Source} from "./Source";

/**
 * Client side Source tools.
 */
export interface ISource<TSource extends Source = Source> {
    repository: TSource["Type"]["UseRepository"];
    query: TSource["Type"]["QueryStoreContext"];
}
