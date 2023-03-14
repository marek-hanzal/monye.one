import {
    createStoreContext,
    IUseState
}                           from "@leight/context-client";
import {type IEntitySchema} from "@leight/source";
import {z}                  from "zod";

export interface ISourceStoreProps<TSchema extends IEntitySchema> {
    readonly schema: TSchema;
    readonly entities: z.infer<TSchema>[];
    readonly isLoading: boolean;
    readonly isFetching: boolean;

    setEntities(entities?: z.infer<TSchema>[]): void;

    setIsLoading(isLoading: boolean): void;

    setIsFetching(isFetching: boolean): void;
}

export type IUseSourceStore<TSchema extends IEntitySchema> = IUseState<ISourceStoreProps<TSchema>>;

export interface ICreateSourceContextProps<TSchema extends IEntitySchema> {
    readonly name: string;
    readonly schema: TSchema;
    readonly entities?: z.infer<TSchema>[];
}

export const createSourceContext = <TSchema extends IEntitySchema>(
    {
        name,
        schema,
        entities = [],
    }: ICreateSourceContextProps<TSchema>) => {
    return createStoreContext<ISourceStoreProps<TSchema>>(
        (set) => ({
            schema,
            entities,
            isLoading:  false,
            isFetching: false,
            setEntities(entities?: z.infer<TSchema>[]) {
                set({entities});
            },
            setIsLoading(isLoading) {
                set({isLoading});
            },
            setIsFetching(isFetching) {
                set({isFetching});
            },
        }),
        `[${name}] SourceContext`,
        `Add [${name}] SourceProvider`,
    );
};
