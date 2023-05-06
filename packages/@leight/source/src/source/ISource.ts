import {type IStoreContext}    from "@leight/context";
import {type IQueryStoreProps} from "../query";
import {type IUseRepository}   from "../repository";
import {type Source}           from "./Source";

/**
 * Client side Source tools.
 */
export interface ISource<TSource extends Source = Source> {
    repository: IUseRepository<TSource["Schema"]["Mapper"]>;
    Query: IStoreContext<IQueryStoreProps<TSource["Schema"]["Repository"]>>;
}
