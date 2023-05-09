import {type ISource, type Source} from "@leight/source";
import {createQueryStore} from "../query";
import {useRepository} from "./useRepository";

export interface IWithSourceStoreProps<TSource extends Source> extends ISource<TSource>, Pick<TSource["Type"], "UseRepository" | "QueryContext"> {
}

/**
 * Entry point for client-side Source/Repository context wrapping all
 * services related to server/client side data manipulation.
 */
export const withSource = <TSource extends Source>(
    {
        name,
        schema,
        repository,
        useInvalidator,
        UseRepository,
        QueryContext,
    }: IWithSourceStoreProps<TSource>): ISource<TSource> => {
    return {
        name,
        schema,
        use: ({cacheTime} = {cacheTime: 120}) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            return useRepository<TSource>({
                UseRepository,
                QueryContext,
                schema,
                cacheTime,
            });
        },
        repository,
        useInvalidator,
        query: createQueryStore<TSource>({
            name,
        }),
    };
};
