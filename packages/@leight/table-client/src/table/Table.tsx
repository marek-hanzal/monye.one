import {type IWithTranslation}            from "@leight/i18n";
import {Translation}                      from "@leight/i18n-client";
import {withPrimaryColor}                 from "@leight/mantine";
import {type IMultiSelectionStoreContext} from "@leight/selection";
import {type IWithIdentity}               from "@leight/source";
import {
    isCallable,
    isString
}                                         from "@leight/utils";
import {classNames}                       from "@leight/utils-client";
import {
    Box,
    createStyles,
    Group,
    LoadingOverlay,
    ScrollArea,
    Table as CoolTable
}                                         from "@mantine/core";
import {
    type ComponentProps,
    type CSSProperties,
    type FC,
    type ReactNode
}                                         from "react";
import {TableAction}                      from "./TableAction";
import {TableRowAction}                   from "./TableRowAction";

const useStyles = createStyles(theme => ({
    table: {
        "&[data-striped] tbody tr.selection":                  {
            backgroundColor: withPrimaryColor(theme, -5),
            "&:hover":       {
                backgroundColor: withPrimaryColor(theme, -6),
            },
        },
        "&[data-striped] tbody tr.selection:nth-of-type(odd)": {
            backgroundColor: withPrimaryColor(theme, -4),
            "$:hover":       {
                backgroundColor: withPrimaryColor(theme, -3),
            },
        },
    },
}));

export interface ITableColumn<TItem extends IWithIdentity = IWithIdentity> {
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
    export type IRender<TItem extends IWithIdentity> =
        ((props: IRenderProps<TItem>) => ReactNode)
        | (keyof TItem)

    export interface IRenderProps<TItem extends IWithIdentity> {
        item: TItem;
        highlight: string[];
    }
}

export type ITableColumns<TColumn extends ITableColumn, TColumnKeys extends string> = Record<TColumnKeys, TColumn>;

type InferItem<T> = T extends ITableColumn<infer U> ? U : T;

export interface ITableInternalProps<TColumn extends ITableColumn, TColumnKeys extends string> extends Partial<Omit<ComponentProps<typeof CoolTable>, "hidden" | "onClick">> {
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

    disableActions?: boolean;

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

    MultiSelectionContext?: IMultiSelectionStoreContext<InferItem<TColumn>>;

    onClick?(item: InferItem<TColumn>): void;
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
        disableActions = false,
        onClick,
        MultiSelectionContext,
        ...props
    }: ITableInternalProps<TColumn, TColumnKeys>) => {

    const {classes} = useStyles();

    /**
     * Do not memo this, or memo carefully! Changing this breaks column sorting and maybe something else too.
     */
    const $columns: [string, TColumn][] = order.filter(column => !hidden.includes(column)).map(column => [
        column,
        overrideColumns[column] || columns[column],
    ]);

    const multiSelection = MultiSelectionContext?.useState();

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
                className={classes.table}
                {...props}
            >
                <thead>
                    <tr>
                        {!disableActions && WithRowAction && !WithTableAction && <th
                            style={{
                                width: "2rem",
                            }}
                        />}
                        {!disableActions && WithTableAction && <th
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
                                label={"table.column"}
                                withLabel={column?.title || name}
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
                        .map(item => <tr
                            key={item.id}
                            className={classNames(
                                multiSelection?.isSelected(item) ? "selection" : undefined,
                            )}
                        >
                            {!disableActions && WithTableAction && !WithRowAction && <td></td>}
                            {!disableActions && WithRowAction && <td>
                                <TableRowAction
                                    WithRowAction={WithRowAction}
                                    props={{
                                        item,
                                    }}
                                />
                            </td>}
                            {$columns.map(([name, column]) => <td
                                key={name}
                                style={onClick ? {cursor: "pointer"} : undefined}
                                onClick={() => onClick?.(item)}
                            >
                                {isCallable(column.render) ? column.render({
                                    item,
                                    highlight: isString(highlight) ? [highlight] : highlight,
                                }) : (item as any)[column.render]}
                            </td>)}
                        </tr>)}
                </tbody>
                {renderFooter ? <tfoot>
                    {!disableActions && (WithTableAction || WithRowAction) && <td></td>}
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
