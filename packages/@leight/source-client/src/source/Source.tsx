import {CursorStore}    from "@leight/cursor-client";
import {
    type ISourceSchema,
    type ISourceStore,
    type ISourceStoreProps,
    type IUseSourceQuery,
}                       from "@leight/source";
import {isCallable}     from "@leight/utils";
import {type IStoreApi} from "@leight/zustand";
import {
    type ReactNode,
    useEffect
}                       from "react";

export interface ISourceInternalProps<TSourceSchema extends ISourceSchema> {
    /**
     * Shape of the data this Source is operating on
     */
    schema: TSourceSchema["EntitySchema"];
    /**
     * React query used to actually query data
     */
    UseSourceQuery: IUseSourceQuery<TSourceSchema>;
    SourceStore: ISourceStore<TSourceSchema>;
    children?: ((store: IStoreApi<ISourceStoreProps<TSourceSchema>>) => ReactNode) | ReactNode;

    /**
     * Optional callback when data is fetched
     */
    onSuccess?(entities: TSourceSchema["Entity"][]): void;
}

export type ISourceProps<TSourceSchema extends ISourceSchema> = Omit<ISourceInternalProps<TSourceSchema>, "schema" | "SourceStore" | "UseSourceQuery">;

interface IInternalSourceProps<TSourceSchema extends ISourceSchema> extends Pick<ISourceInternalProps<TSourceSchema>, "schema" | "UseSourceQuery" | "SourceStore" | "onSuccess" | "children"> {
    sourceContext: IStoreApi<ISourceStoreProps<TSourceSchema>>;
}

const InternalSource = <TSourceSchema extends ISourceSchema>(
    {
        sourceContext,
        SourceStore,
        schema,
        UseSourceQuery,
        onSuccess,
        children,
    }: IInternalSourceProps<TSourceSchema>) => {
    const {page, size} = CursorStore.useState(({page, size}) => ({page, size}));
    const {sort}       = SourceStore.Sort.useState(({sort}) => ({sort}));
    const {filter}     = SourceStore.Filter.useState(({filter}) => ({filter}));
    const result       = UseSourceQuery.useQuery({
        cursor: {
            page,
            size,
        },
        sort,
        filter,
    }, {
        staleTime: undefined,
        cacheTime: undefined,
        onSuccess: data => {
            const $data = data.filter(item => schema.safeParse(item).success);
            onSuccess?.($data);
            sourceContext.state.setEntities($data);
            onSuccess?.($data);
        },
    });

    useEffect(() => {
        sourceContext.state.setIsLoading(result.isLoading);
    }, [result.isLoading]);
    useEffect(() => {
        sourceContext.state.setIsFetching(result.isFetching);
    }, [result.isFetching]);

    return <>{isCallable(children) ? children(sourceContext) : children}</>;
};

export const Source = <TSourceSchema extends ISourceSchema>(
    {
        schema,
        UseSourceQuery,
        onSuccess,
        SourceStore,
        children,
        ...props
    }: ISourceInternalProps<TSourceSchema>) => {
    return <SourceStore.Source.Provider
        {...props}
    >
        {(sourceContext) => <InternalSource
            sourceContext={sourceContext}
            schema={schema}
            UseSourceQuery={UseSourceQuery}
            SourceStore={SourceStore}
            onSuccess={onSuccess}
        >
            {children}
        </InternalSource>}
    </SourceStore.Source.Provider>;
};
