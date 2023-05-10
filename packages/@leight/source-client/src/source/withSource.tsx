import {type Source}      from "@leight/source";
import {createQueryStore} from "../query";
import {useRepository}    from "./useRepository";

export type IWithSourceStoreProps<TSource extends Source> =
    Omit<TSource["Type"]["Source"], "use" | "query" | "UseRepository">;

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
    }: IWithSourceStoreProps<TSource>): TSource["Type"]["Source"] => {
    const QueryContext = createQueryStore<TSource>({
        name,
    });
    return {
        name,
        schema,
        use:   ({cacheTime} = {cacheTime: 120}) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            return useRepository<TSource>({
                UseRepository: repository,
                QueryContext,
                schema,
                cacheTime,
            });
        },
        repository,
        useInvalidator,
        query: QueryContext,
    };
};
