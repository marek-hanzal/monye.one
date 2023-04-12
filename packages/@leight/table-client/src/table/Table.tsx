import {type IWithTranslation} from "@leight/i18n";
import {Translation}           from "@leight/i18n-client";
import {isCallable}            from "@leight/utils";
import {
    Box,
    Group,
    LoadingOverlay,
    ScrollArea,
    Table as CoolTable
}                              from "@mantine/core";
import {
    type ComponentProps,
    type CSSProperties,
    type ReactNode
}                              from "react";

export interface ITableColumn<TItem = any> {
    /**
     * Explicitly override column title (by default column name is taken from Record<> in Table)
     */
    readonly title?: string;
    /**
     * Specify width of a column
     */
    readonly width?: number;
    /**
     * Mandatory render method; if you do not want to render a column, mark it as hidden on a table itself.
     */
    render: ((item: TItem) => ReactNode) | (keyof TItem);
    /**
     * Optionally return styles for a table header column
     */
    headerStyle?: ((defaultStyle: CSSProperties) => CSSProperties | undefined) | CSSProperties;
    /**
     * Render header column; children is the original content of the column (translated name);
     */
    headerRender?: (children: ReactNode) => ReactNode;

    /**
     * Handle clicking column in table header.
     */
    onHeaderClick?(): void;
}

export type ITableColumns<TColumn extends ITableColumn, TColumnKeys extends string> = Record<TColumnKeys, TColumn>;

type InferItem<T> = T extends ITableColumn<infer U> ? U : T;

export interface ITableInternalProps<TColumn extends ITableColumn, TColumnKeys extends string> extends Partial<Omit<ComponentProps<typeof CoolTable>, "hidden">> {
    /**
     * Optional translation configuration
     */
    readonly withTranslation?: IWithTranslation;
    /**
     * Define table columns; they will be rendered by default in the specified order
     */
    readonly columns: ITableColumns<TColumn, TColumnKeys>;
    /**
     * You can override some columns, if you need to
     */
    readonly overrideColumns?: Partial<ITableColumns<TColumn, TColumnKeys>>;
    /**
     * Shows loading overlay; defaults to false
     */
    readonly isLoading?: boolean;
    /**
     * If a table is long, you can specify scroll area
     */
    readonly scrollWidth?: number;
    /**
     * Mark the given columns as hidden
     */
    readonly hidden?: TColumnKeys[];
    /**
     * Specify an order of columns
     */
    readonly order?: TColumnKeys[];
    /**
     * Data of the table.
     */
    readonly items?: InferItem<TColumn>[];
}

export type ITableProps<TColumn extends ITableColumn, TColumnKeys extends string> = ITableInternalProps<TColumn, TColumnKeys>;

export const Table = <TColumn extends ITableColumn, TColumnKeys extends string>(
    {
        withTranslation,
        columns,
        overrideColumns = {},
        isLoading = false,
        scrollWidth,
        hidden = [],
        order = Object.keys(columns) as any,
        items = [],
        ...props
    }: ITableInternalProps<TColumn, TColumnKeys>) => {

    const $columns: [string, TColumn][] = order.filter(column => !hidden.includes(column)).map(column => [
        column,
        (overrideColumns as any)[column] || (columns as any)[column],
    ]);

    return <ScrollArea w={"100%"}>
        <Box w={scrollWidth}>
            <LoadingOverlay
                visible={isLoading}
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
                        {$columns?.map(([name, column]) => {
                            const defaultContent              = <Translation
                                {...withTranslation}
                                label={`table.column.${column?.title || name}`}
                                withLabelFallback={column?.title || name}
                            />;
                            const defaultStyle: CSSProperties = {
                                width: column.width ? `${column.width}rem` : undefined,
                            };
                            return <th
                                key={name}
                                style={(isCallable(column.headerStyle) ? column.headerStyle(defaultStyle) : column.headerStyle) || defaultStyle}
                                onClick={() => column.onHeaderClick?.()}
                            >
                                <Group>
                                    {column.headerRender?.(defaultContent) || defaultContent}
                                </Group>
                            </th>;
                        })}
                    </tr>
                </thead>
                <tbody>
                    {items
                        .map(item => <tr key={item.id}>
                            {$columns.map(([name, column]) => <td key={name}>
                                {isCallable(column.render) ? column.render(item) : (item as any)[column.render]}
                            </td>)}
                        </tr>)}
                </tbody>
            </CoolTable>
        </Box>
    </ScrollArea>;
};
