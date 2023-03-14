import {
    createStoreContext,
    IUseState
}                           from "@leight/context-client";
import {type IEntitySchema} from "@leight/source";
import {z}                  from "zod";

export interface ISourceStoreProps<TSchema extends IEntitySchema> {
    readonly schema: TSchema;
    readonly entities: z.infer<TSchema>[];

    setEntities(entities?: z.infer<TSchema>[]): void;
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
            setEntities(entities?: z.infer<TSchema>[]) {
                set({entities});
            }
        }),
        `[${name}] SourceContext`,
        `Add [${name}] SourceProvider`,
    );
};
