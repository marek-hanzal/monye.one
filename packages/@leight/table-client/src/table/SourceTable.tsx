import {
    CursorStore,
    Pagination
}                              from "@leight/cursor-client";
import {type IPaginationProps} from "@leight/cursor-client/src/cursor/Pagination";
import {Paper}                 from "@leight/mantine";
import {type IUseSortState}    from "@leight/sort";
import {SortIcon}              from "@leight/sort-client";
import {
    type ISourceSchema,
    type IUseSourceState
}                              from "@leight/source";
import {chain}                 from "@leight/utils";
import {
    Center,
    Divider
}                              from "@mantine/core";
import {
    type ITableColumn,
    type ITableProps,
    Table
}                              from "./Table";

export interface ISourceTableColumn<TSourceSchema extends ISourceSchema> extends ITableColumn<TSourceSchema["Entity"]> {
    readonly sort?: keyof TSourceSchema["Sort"];
}

export interface ISourceTableInternalProps<
    TSourceSchema extends ISourceSchema,
    TColumnKeys extends string,
> extends ITableProps<ISourceTableColumn<TSourceSchema>, TColumnKeys> {
    /**
     * Table schema used to infer all internal types.
     */
    schema: TSourceSchema["EntitySchema"];
    useSource: IUseSourceState<TSourceSchema>;
    useSort: IUseSortState<TSourceSchema["SortSchema"]>;
    pagination?: {
        hideOnSingle?: boolean;
        /**
         * Where to put pagination, defaults to ["bottom","top"]
         */
        position?: ("top" | "bottom")[];

        props?: IPaginationProps;
    };
}

/**
 * Public props which any component could extend from (non-partial).
 */
export type ISourceTableProps<
    TSourceSchema extends ISourceSchema,
    TColumnKeys extends string,
> = Omit<ISourceTableInternalProps<TSourceSchema, TColumnKeys>, "schema" | "useSource" | "useSort" | "columns" | "withTranslation">;

export const SourceTable = <
    TSourceSchema extends ISourceSchema,
    TColumnKeys extends string,
>(
    {
        schema,
        useSource,
        useSort,
        columns,
        pagination = {
            hideOnSingle: false,
            position:     [
                "top",
                "bottom"
            ],
        },
        ...props
    }: ISourceTableInternalProps<TSourceSchema, TColumnKeys>) => {
    const {
              entities,
              isFetching,
              isLoading,
          }               = useSource((
        {
            entities,
            isFetching,
            isLoading,
        }) => (
        {
            entities,
            isFetching,
            isLoading,
        }));
    const {sort, setSort} = useSort(({sort, setSort}) => ({sort, setSort}));
    const {pages}         = CursorStore.useState(({pages}) => ({pages}));

    return <Paper>
        {pagination?.position?.includes("top") && (pagination?.hideOnSingle ? pages > 1 : true) && <>
            <Center>
                <Pagination
                    {...pagination?.props}
                />
            </Center>
            <Divider m={"md"}/>
        </>}
        <Table<ISourceTableColumn<TSourceSchema>, TColumnKeys>
            isLoading={isLoading || isFetching}
            columns={Object.entries<ISourceTableColumn<TSourceSchema>>(columns).reduce<any>((prev, [name, column]) => {
                return {
                    ...prev,
                    [name]: {
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
                                {column.sort ? <SortIcon<TSourceSchema["Sort"]> sort={sort} index={column.sort}/> : null}
                                {children}
                            </>;
                        }),
                    },
                };
            }, {})}
            items={entities.filter(entity => schema.safeParse(entity).success)}
            {...props}
        />
        {pagination?.position?.includes("bottom") && (pagination?.hideOnSingle ? pages > 1 : true) && <>
            <Divider m={"md"}/>
            <Center>
                <Pagination
                    {...pagination?.props}
                />
            </Center>
        </>}
    </Paper>;
};
