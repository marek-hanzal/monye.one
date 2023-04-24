import {type IWithTranslation} from "@leight/i18n";
import {Translation}           from "@leight/i18n-client";
import {
    isCallable,
    isString
}                              from "@leight/utils";
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
    type FC,
    type ReactNode
}                              from "react";
import {TableAction}           from "./TableAction";
import {TableRowAction}        from "./TableRowAction";

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
    render: ITableColumn.IRender<TItem>;
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

export namespace ITableColumn {
    export type IRender<TItem = any> =
        ((props: IRenderProps<TItem>) => ReactNode)
        | (keyof TItem)

    export interface IRenderProps<TItem = any> {
        item: TItem;
        highlight: string[];
    }
}

export type ITableColumns<TColumn extends ITableColumn, TColumnKeys extends string> = Record<TColumnKeys, TColumn>;

type InferItem<T> = T extends ITableColumn<infer U> ? U : T;

export interface ITableInternalProps<TColumn extends ITableColumn, TColumnKeys extends string> extends Partial<Omit<ComponentProps<typeof CoolTable>, "hidden">> {
    /**
     * Optional translation configuration
     */
    withTranslation?: IWithTranslation;
    /**
     * Define table columns; they will be rendered by default in the specified order
     */
    columns: ITableColumns<TColumn, TColumnKeys>;
    /**
     * You can override some columns, if you need to
     */
    overrideColumns?: Partial<ITableColumns<TColumn, TColumnKeys>>;
    /**
     * Shows loading overlay; defaults to false
     */
    isLoading?: boolean;
    /**
     * If a table is long, you can specify scroll area
     */
    scrollWidth?: number;
    /**
     * Mark the given columns as hidden
     */
    hidden?: TColumnKeys[];
    /**
     * Specify an order of columns
     */
    order?: TColumnKeys[];
    /**
     * Data of the table.
     */
    items?: InferItem<TColumn>[];
    highlight?: string[];

    /**
     * Component used to render actions over whole table
     */
    WithTableAction?: FC<ITableInternalProps.IWithTableActionProps<TColumn>>;
    /**
     * Per-row component action handler
     */
    WithRowAction?: FC<ITableInternalProps.IWithRowActionProps<TColumn>>;

    renderPrefix?: ITableInternalProps.IRenderPrefix<TColumn>;
    renderFooter?: ITableInternalProps.IRenderFooter<TColumn>;
}

export namespace ITableInternalProps {
    export type IRenderPrefix<TColumn extends ITableColumn> = (props: IRenderPrefixProps<TColumn>) => ReactNode;
    export type IRenderFooter<TColumn extends ITableColumn> = (props: IRenderFooterProps<TColumn>) => ReactNode;

    export interface IRenderPrefixProps<TColumn extends ITableColumn> {
        items: InferItem<TColumn>[];
        columns?: TColumn[];
    }

    export interface IRenderFooterProps<TColumn extends ITableColumn> {
        items: InferItem<TColumn>[];
        columns?: TColumn[];
    }

    export interface IWithTableActionProps<TColumn extends ITableColumn> {
        items?: InferItem<TColumn>[];
    }

    export interface IWithRowActionProps<TColumn extends ITableColumn> {
        item: InferItem<TColumn>;
    }
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
        order = Object.keys(columns) as TColumnKeys[],
        items = [],
        WithTableAction,
        WithRowAction,
        highlight = [],
        renderPrefix,
        renderFooter,
        ...props
    }: ITableInternalProps<TColumn, TColumnKeys>) => {
    /**
     * Do not memo this, or memo carefully! Changing this breaks column sorting and maybe something else too.
     */
    const $columns: [string, TColumn][] = order.filter(column => !hidden.includes(column)).map(column => [
        column,
        overrideColumns[column] || columns[column],
    ]);

    return <ScrollArea
        w={"100%"}
    >
        <Box w={scrollWidth}>
            <LoadingOverlay
                visible={isLoading}
                overlayBlur={2}
                transitionDuration={250}
            />
            {renderPrefix?.({items, columns: $columns.map(([, column]) => column)})}
            <CoolTable
                striped
                highlightOnHover
                withBorder
                withColumnBorders
                style={!items?.length ? {minHeight: "20em"} : undefined}
                {...props}
            >
                <thead>
                    <tr>
                        {WithRowAction && !WithTableAction && <th
                            style={{
                                width: "2rem",
                            }}
                        />}
                        {WithTableAction && <th
                            style={{
                                width: "2rem",
                            }}
                        >
                            <TableAction
                                WithTableAction={WithTableAction}
                                props={{
                                    items,
                                }}
                            />
                        </th>}
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
                            {WithTableAction && !WithRowAction && <td></td>}
                            {WithRowAction && <td>
                                <TableRowAction
                                    WithRowAction={WithRowAction}
                                    props={{
                                        item,
                                    }}
                                />
                            </td>}
                            {$columns.map(([name, column]) => <td key={name}>
                                {isCallable(column.render) ? column.render({
                                    item,
                                    highlight: isString(highlight) ? [highlight] : highlight,
                                }) : (item as any)[column.render]}
                            </td>)}
                        </tr>)}
                </tbody>
                {renderFooter ? <tfoot>
                    <tr>
                        {renderFooter({
                            items,
                            columns: $columns.map(([, column]) => column),
                        })}
                    </tr>
                </tfoot> : null}
            </CoolTable>
        </Box>
    </ScrollArea>;
};
