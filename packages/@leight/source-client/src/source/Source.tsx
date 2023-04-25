import {CursorStore}    from "@leight/cursor-client";
import {
    type ISourceSchemaType,
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

export interface ISourceInternalProps<TSourceSchemaType extends ISourceSchemaType> {
    /**
     * Shape of the data this Source is operating on
     */
    schema: TSourceSchemaType["EntitySchema"];
    /**
     * React query used to actually query data
     */
    UseSourceQuery: IUseSourceQuery<TSourceSchemaType>;
    SourceStore: ISourceStore<TSourceSchemaType>;
    children?: ((store: IStoreApi<ISourceStoreProps<TSourceSchemaType>>) => ReactNode) | ReactNode;

    /**
     * Optional callback when data is fetched
     */
    onSuccess?(entities: ISourceSchemaType.of<TSourceSchemaType>["Entity"][]): void;

    cacheTime?: number;
}

export type ISourceProps<TSourceSchemaType extends ISourceSchemaType> = Omit<ISourceInternalProps<TSourceSchemaType>, "schema" | "SourceStore" | "UseSourceQuery">;

interface IInternalSourceProps<TSourceSchemaType extends ISourceSchemaType> extends Pick<ISourceInternalProps<TSourceSchemaType>, "schema" | "UseSourceQuery" | "cacheTime" | "SourceStore" | "onSuccess" | "children"> {
    sourceContext: IStoreApi<ISourceStoreProps<TSourceSchemaType>>;
}

const InternalSource = <TSourceSchemaType extends ISourceSchemaType>(
    {
        sourceContext,
        SourceStore,
        schema,
        UseSourceQuery,
        onSuccess,
        cacheTime = 120,
        children,
    }: IInternalSourceProps<TSourceSchemaType>) => {
    const $cacheTime   = cacheTime ? cacheTime * 1000 : undefined;
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
        staleTime: $cacheTime,
        cacheTime: $cacheTime,
        onSuccess: data => {
            const $data = data.filter(item => schema.safeParse(item).success);
            onSuccess?.($data);
            sourceContext.state.setDtos($data);
            onSuccess?.($data);
        },
    });

    useEffect(() => {
        if (result.isSuccess) {
            const $data = result.data.filter(item => schema.safeParse(item).success);
            onSuccess?.($data);
            sourceContext.state.setDtos($data);
            onSuccess?.($data);
        }
    }, [result.dataUpdatedAt]);

    useEffect(() => {
        sourceContext.state.setIsLoading(result.isLoading);
    }, [result.isLoading]);
    useEffect(() => {
        sourceContext.state.setIsFetching(result.isFetching);
    }, [result.isFetching]);

    return <>{isCallable(children) ? children(sourceContext) : children}</>;
};

export const Source = <TSourceSchemaType extends ISourceSchemaType>(
    {
        schema,
        UseSourceQuery,
        onSuccess,
        SourceStore,
        children,
        cacheTime,
        ...props
    }: ISourceInternalProps<TSourceSchemaType>) => {
    return <SourceStore.Source.Provider
        {...props}
    >
        {(sourceContext) => <InternalSource
            sourceContext={sourceContext}
            schema={schema}
            UseSourceQuery={UseSourceQuery}
            SourceStore={SourceStore}
            onSuccess={onSuccess}
            cacheTime={cacheTime}
        >
            {children}
        </InternalSource>}
    </SourceStore.Source.Provider>;
};
