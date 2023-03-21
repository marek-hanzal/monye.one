import {Pagination}            from "@leight/cursor-client";
import {type IWithTranslation} from "@leight/i18n";
import {Translation}           from "@leight/i18n-client";
import {Paper}                 from "@leight/mantine";
import {type IUseSortState}    from "@leight/sort";
import {SortIcon}              from "@leight/sort-client";
import {
    type ISourceSchema,
    type IUseSourceState
}                              from "@leight/source";
import {isCallable}            from "@leight/utils";
import {
    Box,
    Center,
    Divider,
    Group,
    LoadingOverlay,
    ScrollArea,
    Table as CoolTable
}                              from "@mantine/core";
import {
    type ComponentProps,
    type ReactNode
}                              from "react";

export interface ITableColumn<TSourceSchema extends ISourceSchema> {
    /**
     * Explicitly override column title (by default column name is taken from Record<> in Table)
     */
    readonly title?: string;
    readonly width?: number;
    readonly sort?: keyof TSourceSchema["Sort"];

    render: ((entity: TSourceSchema["Entity"]) => ReactNode) | (keyof TSourceSchema["Entity"]);
}

export interface ITableInternalProps<
    TSourceSchema extends ISourceSchema,
    TColumns extends string,
> extends Partial<Omit<ComponentProps<typeof CoolTable>, "hidden">> {
    /**
     * Table schema used to infer all internal types.
     */
    readonly schema: TSourceSchema["EntitySchema"];
    readonly useSource: IUseSourceState<TSourceSchema>;
    readonly useSort: IUseSortState<TSourceSchema["SortSchema"]>;
    readonly withTranslation: IWithTranslation;
    readonly columns: Record<TColumns, ITableColumn<TSourceSchema>>;
    readonly overrideColumns?: Partial<Record<TColumns, ITableColumn<TSourceSchema>>>;
    readonly scrollX?: number;

    /**
     * Specify hidden columns.
     */
    readonly hidden?: TColumns[];

    /**
     * Optionally return column order.
     */
    readonly order?: TColumns[];
}

export const chain = (value: any, chain: any[]) => {
    if (!chain.length) {
        console.warn("Chain does not have chaining values (an empty array).");
        return value;
    }
    const index = chain.indexOf(value);
    if (index === -1) {
        return chain[0];
    } else if ((index + 1) === chain.length) {
        return chain[0];
    }
    return chain[index + 1];
};

/**
 * Public props which any component could extend from (non-partial).
 */
export type ITableProps<
    TSourceSchema extends ISourceSchema,
    TColumns extends string,
> = Omit<ITableInternalProps<TSourceSchema, TColumns>, "schema" | "useSource" | "useSort" | "columns" | "withTranslation">;

export const Table = <
    TSourceSchema extends ISourceSchema,
    TColumns extends string,
>(
    {
        schema,
        useSource,
        useSort,
        withTranslation,
        scrollX,
        columns,
        overrideColumns = {},
        hidden = [],
        order = Object.keys(columns) as any,
        ...props
    }: ITableInternalProps<TSourceSchema, TColumns>) => {
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

    const $columns: [string, ITableColumn<TSourceSchema>][] = order.filter(column => !hidden.includes(column)).map(column => [
        column,
        (overrideColumns as any)[column] || (columns as any)[column],
    ]);

    return <Paper>
        <Center>
            <Pagination/>
        </Center>
        <Divider m={"md"}/>
        <ScrollArea w={"100%"}>
            <Box w={scrollX}>
                <LoadingOverlay
                    visible={isFetching || isLoading}
                    overlayBlur={2}
                    transitionDuration={250}
                />
                <CoolTable
                    striped
                    highlightOnHover
                    withBorder
                    withColumnBorders
                    {...props}
                >
                    <thead>
                        <tr>
                            {$columns?.map(([name, column]) => <th
                                key={name}
                                style={{
                                    cursor: column.sort ? "pointer" : undefined,
                                    width:  column.width ? `${column.width}rem` : undefined,
                                }}
                                onClick={() => {
                                    column.sort && setSort(column.sort, chain(sort[column.sort], [
                                        "asc",
                                        "desc",
                                        undefined,
                                    ]));
                                }}
                            >
                                <Group>
                                    {column.sort ? <SortIcon<TSourceSchema["Sort"]> sort={sort} index={column.sort}/> : null}
                                    <Translation {...withTranslation} label={`table.column.${column?.title || name}`}/>
                                </Group>
                            </th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {entities
                            .filter(entity => schema.safeParse(entity).success)
                            .map(entity => <tr key={entity.id}>
                                {$columns.map(([name, column]) => <td key={name}>
                                    {isCallable(column.render) ? column.render(entity) : (entity as any)[column.render]}
                                </td>)}
                            </tr>)}
                    </tbody>
                </CoolTable>
            </Box>
        </ScrollArea>
        <Divider m={"md"}/>
        <Center>
            <Pagination/>
        </Center>
    </Paper>;
};
