import {type IStoreProvider}  from "@leight/context";
import {CursorStore}          from "@leight/cursor-client";
import {type IUseFilterState} from "@leight/filter";
import {type IUseSortState}   from "@leight/sort";
import {
    type ISourceSchema,
    type ISourceStoreProps,
    type IUseSourceQuery,
}                             from "@leight/source";
import {isCallable}           from "@leight/utils";
import {type IStoreApi}       from "@leight/zustand";
import {
    type ReactNode,
    useEffect
}                             from "react";

export interface ISourceInternalProps<TSourceSchema extends ISourceSchema> {
    /**
     * Shape of the data this Source is operating on
     */
    schema: TSourceSchema["EntitySchema"];
    /**
     * React query used to actually query data
     */
    useSourceQuery: IUseSourceQuery<TSourceSchema>["Query"];
    useFilterState: IUseFilterState<TSourceSchema["FilterSchema"]>;
    useSortState: IUseSortState<TSourceSchema["SortSchema"]>;
    SourceProvider: IStoreProvider<ISourceStoreProps<TSourceSchema>>;
    children?: ((store: IStoreApi<ISourceStoreProps<TSourceSchema>>) => ReactNode) | ReactNode;

    /**
     * Optional callback when data is fetched
     */
    onSuccess?(entities: TSourceSchema["Entity"][]): void;
}

export type ISourceProps<TSourceSchema extends ISourceSchema> = Omit<ISourceInternalProps<TSourceSchema>, "schema" | "SourceProvider" | "useSourceQuery" | "useSortState" | "useFilterState">;

interface IInternalSourceProps<TSourceSchema extends ISourceSchema> extends Pick<ISourceInternalProps<TSourceSchema>, "schema" | "useSourceQuery" | "useSortState" | "useFilterState" | "onSuccess" | "children"> {
    sourceContext: IStoreApi<ISourceStoreProps<TSourceSchema>>;
}

const InternalSource = <TSourceSchema extends ISourceSchema>(
    {
        sourceContext,
        schema,
        useSourceQuery,
        useFilterState,
        useSortState,
        onSuccess,
        children,
    }: IInternalSourceProps<TSourceSchema>) => {
    const {page, size} = CursorStore.useState(({page, size}) => ({page, size}));
    const {sort}       = useSortState(({sort}) => ({sort}));
    const {filter}     = useFilterState(({filter}) => ({filter}));
    const result       = useSourceQuery({
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
        useSourceQuery,
        useFilterState,
        useSortState,
        onSuccess,
        SourceProvider,
        children,
        ...props
    }: ISourceInternalProps<TSourceSchema>) => {
    return <SourceProvider
        {...props}
    >
        {(sourceContext) => <InternalSource
            sourceContext={sourceContext}
            schema={schema}
            useSourceQuery={useSourceQuery}
            useFilterState={useFilterState}
            useSortState={useSortState}
            onSuccess={onSuccess}
        >
            {children}
        </InternalSource>}
    </SourceProvider>;
};
