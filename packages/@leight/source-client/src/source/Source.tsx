import {CursorStore} from "@leight/cursor-client";
import {
    type ISourceSchemaType,
    type ISourceStore,
    type IUseSourceQuery,
}                    from "@leight/source";
import {
    type PropsWithChildren,
    useEffect
}                    from "react";

export type ISourceInternalProps<TSourceSchemaType extends ISourceSchemaType> = PropsWithChildren<{
    /**
     * Shape of the data this Source is operating on
     */
    schema: TSourceSchemaType["EntitySchema"];
    /**
     * React query used to actually query data
     */
    UseSourceQuery: IUseSourceQuery<TSourceSchemaType>;
    SourceStore: ISourceStore<TSourceSchemaType>;
    /**
     * Optional callback when data is fetched
     */
    onSuccess?(entities: ISourceSchemaType.of<TSourceSchemaType>["Entity"][]): void;

    cacheTime?: number;
}>

export type ISourceProps<TSourceSchemaType extends ISourceSchemaType> = Omit<ISourceInternalProps<TSourceSchemaType>, "schema" | "SourceStore" | "UseSourceQuery">;

interface IInternalSourceProps<TSourceSchemaType extends ISourceSchemaType> extends Pick<ISourceInternalProps<TSourceSchemaType>, "schema" | "UseSourceQuery" | "cacheTime" | "SourceStore" | "onSuccess" | "children"> {
}

const InternalSource = <TSourceSchemaType extends ISourceSchemaType>(
    {
        SourceStore,
        schema,
        UseSourceQuery,
        onSuccess,
        cacheTime = 120,
        children,
    }: IInternalSourceProps<TSourceSchemaType>) => {
    const $cacheTime                             = cacheTime ? cacheTime * 1000 : undefined;
    const {page, size}                           = CursorStore.useState(({page, size}) => ({page, size}));
    const {sort}                                 = SourceStore.Sort.useState(({sort}) => ({sort}));
    const {filter}                               = SourceStore.Filter.useState(({filter}) => ({filter}));
    const {setIsLoading, setIsFetching, setDtos} = SourceStore.Source.useState(({setIsLoading, setIsFetching, setDtos}) => ({setIsLoading, setIsFetching, setDtos}));
    const result                                 = UseSourceQuery.useQuery({
        cursor: {
            page,
            size,
        },
        sort,
        filter,
    }, {
        staleTime: $cacheTime,
        cacheTime: $cacheTime,
    });

    useEffect(() => {
        if (result.isSuccess) {
            const $data = result.data.filter(item => schema.safeParse(item).success);
            console.log("Setting cache data", $data.length, "from", result?.data?.length);
            setDtos($data);
            onSuccess?.($data);
        }
    }, [
        result.dataUpdatedAt,
        result.isSuccess,
    ]);

    useEffect(() => {
        setIsLoading(result.isLoading);
    }, [result.isLoading]);
    useEffect(() => {
        setIsFetching(result.isFetching);
    }, [result.isFetching]);

    return <>{children}</>;
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
        <InternalSource
            schema={schema}
            UseSourceQuery={UseSourceQuery}
            SourceStore={SourceStore}
            onSuccess={onSuccess}
            cacheTime={cacheTime}
        >
            {children}
        </InternalSource>
    </SourceStore.Source.Provider>;
};
