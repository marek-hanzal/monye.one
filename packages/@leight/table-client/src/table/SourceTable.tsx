import {Fulltext} from "@leight/mantine";
import {
    type ISource,
    type ISourceSchema,
    type SourceType
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
    type ReactNode,
    useEffect
}                 from "react";
import {
    type ITableColumn,
    type ITableProps,
    Table
}                 from "./Table";

export interface ISourceTableColumn<
    TSourceSchema extends ISourceSchema,
    TSourceType extends SourceType<TSourceSchema> = SourceType<TSourceSchema>
> extends ITableColumn<TSourceType["Dto"]> {
    sort?: keyof TSourceType["Sort"];
}

export interface ISourceTableInternalProps<
    TSourceSchema extends ISourceSchema,
    TColumnKeys extends string
> extends ITableProps<ISourceTableColumn<TSourceSchema>, TColumnKeys> {
    /**
     * Table schema used to infer all internal types.
     */
    schema: TSourceSchema["DtoSchema"];
    Source: ISource<TSourceSchema>;
    pagination?: {
        hideOnSingle?: boolean;
        /**
         * Where to put pagination, defaults to ["bottom","top"]
         */
        position?: ("top" | "bottom")[];

        props?: Omit<IPaginationProps, "Source">;
    };
    withFulltext?: boolean;
    sourceCacheTime?: number;
    filter?: ReactNode;
}

/**
 * Public props which any component could extend from (non-partial).
 */
export type ISourceTableProps<
    TSourceSchema extends ISourceSchema,
    TColumnKeys extends string,
> = Omit<ISourceTableInternalProps<TSourceSchema, TColumnKeys>, "schema" | "Source" | "columns" | "withTranslation">;

export const SourceTable = <
    TSourceSchema extends ISourceSchema,
    TColumnKeys extends string,
    TSourceType extends SourceType<TSourceSchema> = SourceType<TSourceSchema>
>(
    {
        schema,
        Source,
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
    }: ISourceTableInternalProps<TSourceSchema, TColumnKeys>) => {
    const {
        data,
        result
    } = Source.use({cacheTime: sourceCacheTime});
    const fulltextStore = FulltextStoreContext.use$();
    const {
        sort,
        withSort,
        withShallowFilter
    } = Source.query.use((
        {
            sort,
            withSort,
            withShallowFilter
        }) => ({
        sort,
        withSort,
        withShallowFilter
    }));

    useEffect(() => {
        if (!withFulltext || !fulltextStore) {
            return;
        }
        withShallowFilter({
            fulltext: fulltextStore.fulltext || undefined,
        });
    }, [fulltextStore?.fulltext]);

    const isLoading = result.isLoading || result.isFetching;

    return <>
        <Grid align={"center"} mt={"sm"}>
            {withFulltext && <Grid.Col span={"auto"}>
                <Fulltext
                    Source={Source}
                    loading={isLoading}
                    withTranslation={props.withTranslation}
                />
            </Grid.Col>}
            {filter ? <Grid.Col span={"content"}>{filter}</Grid.Col> : null}
        </Grid>
        {pagination?.position?.includes("top") && <>
            <Pagination
                Source={Source}
                hideOnSingle={pagination?.hideOnSingle}
                mt={"sm"}
                {...pagination?.props}
            />
        </>}
        <Table<ISourceTableColumn<TSourceSchema>, TColumnKeys>
            mt={"sm"}
            isLoading={isLoading}
            highlight={keywordsOf(fulltextStore?.fulltext)}
            columns={Object.entries<ISourceTableColumn<TSourceSchema>>(columns).reduce<any>((prev, [name, column]) => {
                prev[name] = {
                    ...column,
                    headerStyle:   column.headerStyle || (defaultStyle => ({
                        ...defaultStyle,
                        cursor: column.sort ? "pointer" : undefined,
                    })),
                    onHeaderClick: column.onHeaderClick || (() => {
                        column.sort && withSort(column.sort as string, chain((sort as any)[column.sort], [
                            "asc",
                            "desc",
                            undefined,
                        ]));
                    }),
                    headerRender:  column.headerRender || ((children) => {
                        return <>
                            {column.sort ? <SortIcon<TSourceType["Sort"]> sort={sort} index={column.sort}/> : null}
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
                Source={Source}
                hideOnSingle={pagination?.hideOnSingle}
                mt={"sm"}
                {...pagination?.props}
            />
        </>}
    </>;
};
