import {type IWithTranslation} from "@leight/i18n";
import {Translation}           from "@leight/i18n-client";
import {Paper}                 from "@leight/mantine";
import {type IEntitySchema}    from "@leight/source";
import {
    Center,
    Divider,
    Pagination,
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

    render(entity: z.infer<TSchema>): ReactNode;
}

export interface ITableProps<
    TSchema extends IEntitySchema,
    TColumns extends string,
> extends Partial<Omit<ComponentProps<typeof CoolTable>, "hidden">> {
    /**
     * Table schema used to infer all internal types.
     */
    readonly schema: TSchema;
    readonly withTranslation: IWithTranslation;
    readonly withCaption?: boolean;
    readonly columns: Record<TColumns, ITableColumn<TSchema>>;

    /**
     * Specify hidden columns.
     */
    readonly hidden?: TColumns[];

    /**
     * Optionally return column order.
     */
    readonly order?: TColumns[];
}

export const Table = <
    TSchema extends IEntitySchema,
    TColumns extends string,
>(
    {
        schema,
        withTranslation,
        withCaption = true,
        columns,
        hidden = [],
        order = Object.keys(columns) as any,
        ...props
    }: ITableProps<TSchema, TColumns>) => {

    const entities: z.infer<TSchema>[] = [];

    const $columns: [string, ITableColumn<TSchema>][] = order.filter(column => !hidden.includes(column)).map(column => [
        column,
        (columns as any)[column],
    ]);

    return <Paper>
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
                        <Translation {...withTranslation} label={`column.${column?.title || name}`}/>
                    </th>)}
                </tr>
            </thead>
            <tbody>
                {entities
                    .filter(entity => schema.safeParse(entity).success)
                    .map(entity => <tr key={entity.id}>
                        {$columns.map(([name, column]) => <td key={name}>
                            {column.render(null as any)}
                        </td>)}
                    </tr>)}
            </tbody>
        </CoolTable>
        <Divider m={"md"}/>
        <Center>
            <Pagination
                total={20}
                siblings={1}
                defaultValue={0}
            />
        </Center>
    </Paper>;
};
