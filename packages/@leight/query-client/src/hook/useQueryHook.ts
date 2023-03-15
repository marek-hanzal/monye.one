import {
    createStoreContext,
    type IUseState
}                          from "@leight/context-client";
import {type IQuerySchema} from "@leight/query";
import {createId}          from "@paralleldrive/cuid2";
import {z}                 from "zod";

export interface IQueryStoreProps<TQuerySchema extends IQuerySchema> {
    readonly id: string;
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
            id:    createId(),
            schema,
            query: {
                cursor: {
                    page: 0,
                    size: 20,
                },
            },
            setSize(size) {
                set(({query}) => ({
                    id:    createId(),
                    query: {
                        ...query,
                        cursor: {...query.cursor, size}
                    },
                }));
            },
            setPage(page) {
                set(({query}) => ({
                    id:    createId(),
                    query: {
                        ...query,
                        cursor: {...query.cursor, page}
                    },
                }));
            },
        }),
        `[${name}] QueryContext`,
        `Add [${name}] QueryProvider`,
    );
};
