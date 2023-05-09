import {type Source} from "./Source";

/**
 * Client side Source tools.
 */
export interface ISource<TSource extends Source = Source> {
    name: string;
    schema: TSource["Schema"];
    repository: TSource["Type"]["UseRepository"];
    query: TSource["Type"]["QueryContext"];
    use: TSource["Type"]["Use"];
    useInvalidator: TSource["Type"]["UseInvalidator"];
}
