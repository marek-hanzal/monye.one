import {
    type ISource,
    type ISourceSchema
}                         from "@leight/source";
import {createQueryStore} from "../query";
import {useRepository}    from "./useRepository";

export type IWithSourceStoreProps<TSourceSchema extends ISourceSchema> = {
    name: string;
    schema: TSourceSchema;
    repository: ISource.IUseRepository<TSourceSchema>;
    useInvalidator: ISource.IUseInvalidator;
}

/**
 * Entry point for client-side Source/Repository context wrapping all
 * services related to server/client side data manipulation.
 */
export const withSource = <TSourceSchema extends ISourceSchema>(
    {
        name,
        schema,
        repository,
        useInvalidator,
    }: IWithSourceStoreProps<TSourceSchema>): ISource<TSourceSchema> => {
    const QueryContext = createQueryStore<TSourceSchema>({
        name,
    });
    return {
        name,
        schema,
        use:   ({cacheTime} = {cacheTime: 120}) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            return useRepository<TSourceSchema>({
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
