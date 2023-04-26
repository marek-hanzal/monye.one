import {Fulltext} from "@leight/mantine";
import {
    type ISourceSchemaType,
    type ISourceStore
}                 from "@leight/source";
import {
    FulltextStoreContext,
    type IPaginationProps,
    Pagination,
    SortIcon
}                 from "@leight/source-client";
import {
    chain,
    keywordsOf
}                 from "@leight/utils";
import {Grid}     from "@mantine/core";
import {
    ReactNode,
    useEffect
}                 from "react";
import {
    type ITableColumn,
    type ITableProps,
    Table
}                 from "./Table";

export interface ISourceTableColumn<TSourceSchemaType extends ISourceSchemaType> extends ITableColumn<TSourceSchemaType["Dto"]> {
    readonly sort?: keyof TSourceSchemaType["Sort"];
}

export interface ISourceTableInternalProps<
    TSourceSchemaType extends ISourceSchemaType,
    TColumnKeys extends string,
> extends ITableProps<ISourceTableColumn<TSourceSchemaType>, TColumnKeys> {
    /**
     * Table schema used to infer all internal types.
     */
    schema: TSourceSchemaType["DtoSchema"];
    SourceStore: ISourceStore<TSourceSchemaType>;
    pagination?: {
        hideOnSingle?: boolean;
        /**
         * Where to put pagination, defaults to ["bottom","top"]
         */
        position?: ("top" | "bottom")[];

        props?: Omit<IPaginationProps, "SourceStore">;
    };
    withFulltext?: boolean;
    sourceCacheTime?: number;
    filter?: ReactNode;
}

/**
 * Public props which any component could extend from (non-partial).
 */
export type ISourceTableProps<
    TSourceSchemaType extends ISourceSchemaType,
    TColumnKeys extends string,
> = Omit<ISourceTableInternalProps<TSourceSchemaType, TColumnKeys>, "schema" | "SourceStore" | "columns" | "withTranslation">;

export const SourceTable = <
    TSourceSchemaType extends ISourceSchemaType,
    TColumnKeys extends string,
>(
    {
        schema,
        SourceStore,
        columns,
        pagination = {
            hideOnSingle: false,
            position:     [
                "bottom"
            ],
        },
        withFulltext = false,
        sourceCacheTime = 120,
        filter,
        ...props
    }: ISourceTableInternalProps<TSourceSchemaType, TColumnKeys>) => {
    const {data, result}                    = SourceStore.useSource({cacheTime: sourceCacheTime});
    const fulltextStore                     = FulltextStoreContext.useOptionalState();
    const {sort, setSort, setShallowFilter} = SourceStore.Query.useState(({sort, setSort, setShallowFilter}) => ({sort, setSort, setShallowFilter}));

    useEffect(() => {
        if (!withFulltext || !fulltextStore) {
            return;
        }
        setShallowFilter({
            fulltext: fulltextStore.fulltext,
        });
    }, [fulltextStore?.fulltext]);

    const isLoading = result.isLoading || result.isFetching;

    return <>
        <Grid align={"center"} mt={"sm"}>
            {withFulltext && <Grid.Col span={"auto"}>
                <Fulltext
                    SourceStore={SourceStore}
                    loading={isLoading}
                    withTranslation={props.withTranslation}
                />
            </Grid.Col>}
            {filter ? <Grid.Col span={"content"}>{filter}</Grid.Col> : null}
        </Grid>
        {pagination?.position?.includes("top") && <>
            <Pagination
                SourceStore={SourceStore}
                hideOnSingle={pagination?.hideOnSingle}
                mt={"sm"}
                {...pagination?.props}
            />
        </>}
        <Table<ISourceTableColumn<TSourceSchemaType>, TColumnKeys>
            mt={"sm"}
            isLoading={isLoading}
            highlight={keywordsOf(fulltextStore?.fulltext)}
            columns={Object.entries<ISourceTableColumn<TSourceSchemaType>>(columns).reduce<any>((prev, [name, column]) => {
                prev[name] = {
                    ...column,
                    headerStyle:   column.headerStyle || (defaultStyle => ({
                        ...defaultStyle,
                        cursor: column.sort ? "pointer" : undefined,
                    })),
                    onHeaderClick: column.onHeaderClick || (() => {
                        column.sort && setSort(column.sort, chain(sort[column.sort], [
                            "asc",
                            "desc",
                            undefined,
                        ]));
                    }),
                    headerRender:  column.headerRender || ((children) => {
                        return <>
                            {column.sort ? <SortIcon<TSourceSchemaType["Sort"]> sort={sort} index={column.sort}/> : null}
                            {children}
                        </>;
                    }),
                };
                return prev;
            }, {})}
            items={data.filter(dto => schema.safeParse(dto).success)}
            {...props}
        />
        {pagination?.position?.includes("bottom") && <>
            <Pagination
                SourceStore={SourceStore}
                hideOnSingle={pagination?.hideOnSingle}
                mt={"sm"}
                {...pagination?.props}
            />
        </>}
    </>;
};
