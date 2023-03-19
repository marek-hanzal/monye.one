import {createStoreContext} from "@leight/context-client";
import {
    type ISourceSchema,
    type ISourceStoreProps
}                           from "@leight/source";


export interface ICreateSourceContextProps<TSourceSchema extends ISourceSchema> {
    readonly name: string;
    readonly schema: TSourceSchema["EntitySchema"];
    readonly entities?: TSourceSchema["Entity"][];
}

export const createSourceContext = <TSourceSchema extends ISourceSchema>(
    {
        name,
        schema,
        entities = [],
    }: ICreateSourceContextProps<TSourceSchema>) => {
    return createStoreContext<ISourceStoreProps<TSourceSchema>>(
        (set) => ({
            schema,
            entities,
            isLoading:  false,
            isFetching: false,
            setEntities(entities) {
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
