import {createStoreContext} from "@leight/context-client";
import {type IEntitySchema} from "@leight/source";
import {z}                  from "zod";

export interface ISourceStoreProps<TSchema extends IEntitySchema> {
    readonly schema: TSchema;
    readonly entities: z.infer<TSchema>[];
}

export interface ICreateSourceContextProps<TSchema extends IEntitySchema> {
    readonly schema: TSchema;
    readonly entities?: z.infer<TSchema>[];
}

export const createSourceContext = <TSchema extends IEntitySchema>(
    {
        schema,
        entities = [],
    }: ICreateSourceContextProps<TSchema>) => {
    return createStoreContext<ISourceStoreProps<TSchema>>(
        (set, get) => ({
            schema,
            entities,
        }),
        "SourceContext",
        "Add SourceProvider."
    );
};
