import {
    createStoreContext,
    type IUseState
}                           from "@leight/context-client";
import {type ICursorSchema} from "@leight/cursor";
import {type IQuerySchema}  from "@leight/query";
import {z}                  from "zod";

export interface IQueryStoreProps<TQuerySchema extends IQuerySchema> {
    readonly schema: TQuerySchema;
    readonly cursor: z.infer<ICursorSchema>;

    setSize(size: number): void;

    setPage(page: number): void;

    getQuery(): z.infer<TQuerySchema>;
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
        (set, get) => ({
            schema,
            cursor: {
                page: 0,
                size: 15,
            },
            setSize(size) {
                set(state => ({cursor: {...state.cursor, size}}));
            },
            setPage(page) {
                set(state => ({cursor: {...state.cursor, page}}));
            },
            getQuery() {
                return {
                    cursor: get().cursor,
                };
            }
        }),
        `[${name}] QueryContext`,
        `Add [${name}] QueryProvider`,
    );
};
