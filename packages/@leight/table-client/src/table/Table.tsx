import {Pagination}            from "@leight/cursor-client";
import {type IWithTranslation} from "@leight/i18n";
import {Translation}           from "@leight/i18n-client";
import {Paper}                 from "@leight/mantine";
import {type IEntitySchema}    from "@leight/source";
import {type IUseSourceStore}  from "@leight/source-client";
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
import {z}                     from "zod";

export interface ITableColumn<TSchema extends IEntitySchema> {
    /**
     * Explicitly override column title (by default column name is taken from Record<> in Table)
     */
    readonly title?: string;

    render: ((entity: z.infer<TSchema>) => ReactNode) | (keyof (z.infer<TSchema>));
}

export interface ITableInternalProps<
    TSchema extends IEntitySchema,
    TColumns extends string,
> extends Partial<Omit<ComponentProps<typeof CoolTable>, "hidden">> {
    /**
     * Table schema used to infer all internal types.
     */
    readonly schema: TSchema;
    readonly useSource: IUseSourceStore<TSchema>;
    readonly withTranslation: IWithTranslation;
    readonly withCaption?: boolean;
    readonly columns: Record<TColumns, ITableColumn<TSchema>>;
    readonly overrideColumns?: Partial<Record<TColumns, ITableColumn<TSchema>>>;

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
    TSchema extends IEntitySchema,
    TColumns extends string,
> = Omit<ITableInternalProps<TSchema, TColumns>, "schema" | "useSource" | "columns" | "withTranslation">;

export const Table = <
    TSchema extends IEntitySchema,
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
    }: ITableInternalProps<TSchema, TColumns>) => {
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

    const $columns: [string, ITableColumn<TSchema>][] = order.filter(column => !hidden.includes(column)).map(column => [
        column,
        (overrideColumns as any)[column] || (columns as any)[column],
    ]);

    return <Paper>
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
``;
