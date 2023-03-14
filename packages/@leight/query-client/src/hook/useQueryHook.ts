import {
    createStoreContext,
    type IUseState
}                          from "@leight/context-client";
import {type IQuerySchema} from "@leight/query";
import {z}                 from "zod";

export interface IQueryStoreProps<TQuerySchema extends IQuerySchema> {
    readonly schema: TQuerySchema;

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
        (set) => ({
            schema,
            getQuery() {
                return {
                    cursor: {
                        page: 0,
                        size: 5,
                    }
                };
            }
        }),
        `[${name}] QueryContext`,
        `Add [${name}] QueryProvider`,
    );
};
