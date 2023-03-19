import {Pagination}            from "@leight/cursor-client";
import {type IWithTranslation} from "@leight/i18n";
import {Translation}           from "@leight/i18n-client";
import {Paper}                 from "@leight/mantine";
import {
    type ISourceSchema,
    type IUseSourceState
}                              from "@leight/source";
import {isCallable}            from "@leight/utils";
import {
    Center,
    Divider,
    LoadingOverlay,
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
    readonly withTranslation: IWithTranslation;
    readonly withCaption?: boolean;
    readonly columns: Record<TColumns, ITableColumn<TSourceSchema>>;
    readonly overrideColumns?: Partial<Record<TColumns, ITableColumn<TSourceSchema>>>;

    /**
     * Specify hidden columns.
     */
    readonly hidden?: TColumns[];

    /**
     * Optionally return column order.
     */
    readonly order?: TColumns[];
}

/**
 * Public props which any component could extend from (non-partial).
 */
export type ITableProps<
    TSourceSchema extends ISourceSchema,
    TColumns extends string,
> = Omit<ITableInternalProps<TSourceSchema, TColumns>, "schema" | "useSource" | "columns" | "withTranslation">;

export const Table = <
    TSourceSchema extends ISourceSchema,
    TColumns extends string,
>(
    {
        schema,
        useSource,
        withTranslation,
        withCaption = true,
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
          } = useSource((
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

    const $columns: [string, ITableColumn<TSourceSchema>][] = order.filter(column => !hidden.includes(column)).map(column => [
        column,
        (overrideColumns as any)[column] || (columns as any)[column],
    ]);

    return <Paper>
        <LoadingOverlay
            visible={isFetching || isLoading}
            overlayBlur={2}
            transitionDuration={250}
        />
        <Center>
            <Pagination/>
        </Center>
        <Divider m={"md"}/>
        <CoolTable
            striped
            highlightOnHover
            withBorder
            withColumnBorders
            {...props}
        >
            {withCaption && <caption><Translation {...withTranslation} label={"table.caption"}/></caption>}
            <thead>
                <tr>
                    {$columns?.map(([name, column]) => <th key={name}>
                        <Translation {...withTranslation} label={`table.column.${column?.title || name}`}/>
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
        <Divider m={"md"}/>
        <Center>
            <Pagination/>
        </Center>
    </Paper>;
};
