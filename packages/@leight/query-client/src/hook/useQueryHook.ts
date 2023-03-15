import {
    createStoreContext,
    type IUseState
}                          from "@leight/context-client";
import {type IQuerySchema} from "@leight/query";
import {z}                 from "zod";

export interface IQueryStoreProps<TQuerySchema extends IQuerySchema> {
    readonly schema: TQuerySchema;
    readonly query: z.infer<TQuerySchema>;

    setSize(size: number): void;

    setPage(page: number): void;
}

export type IUseQueryStore<TQuerySchema extends IQuerySchema> = IUseState<IQueryStoreProps<TQuerySchema>>;

export interface ICreateQueryContextProps<TQuerySchema extends IQuerySchema> {
    readonly name: string;
    readonly schema: TQuerySchema;
}

export const createQueryContext = <TQuerySchema extends IQuerySchema>(
    {
        name,
        schema,
    }: ICreateQueryContextProps<TQuerySchema>) => {
    return createStoreContext<IQueryStoreProps<TQuerySchema>>(
        (set) => ({
            schema,
            query: {
                cursor: {
                    page: 0,
                    size: 15,
                },
            },
            setSize(size) {
                set(({query}) => ({
                        query: {
                            ...query,
                            cursor: {...query.cursor, size}
                        },
                    }
                ));
            },
            setPage(page) {
                set(({query}) => ({
                        query: {
                            ...query,
                            cursor: {...query.cursor, page}
                        },
                    }
                ));
            },
        }),
        `[${name}] QueryContext`,
        `Add [${name}] QueryProvider`,
    );
};
