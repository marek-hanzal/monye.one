import {type IWithTranslation} from "@leight/i18n";
import {Translation}           from "@leight/i18n-client";
import {isCallable}            from "@leight/utils";
import {
    ActionIcon,
    Box,
    Group,
    LoadingOverlay,
    Popover,
    ScrollArea,
    Table as CoolTable
}                              from "@mantine/core";
import {
    IconLayoutBottombarCollapse,
    IconMenu
}                              from "@tabler/icons-react";
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

    /**
     * Renders action icon in table head; renders Popover with the content returned from this method.
     */
    withTableAction?(props: ITableInternalProps.IWithTableActionProps<TColumn>): ReactNode;

    /**
     * Renders action icon for every row; renders Popover with the content returned from this method.
     */
    withRowAction?(props: ITableInternalProps.IWithRowActionProps<TColumn>): ReactNode;
}

export namespace ITableInternalProps {
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
        order = Object.keys(columns) as any,
        items = [],
        withTableAction,
        withRowAction,
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
                style={!items?.length ? {minHeight: "20em"} : undefined}
                {...props}
            >
                <thead>
                    <tr>
                        {withRowAction && !withTableAction && <th
                            style={{
                                width: "2rem",
                            }}
                        />}
                        {withTableAction && <th
                            style={{
                                width: "2rem",
                            }}
                        >
                            <Popover position={"bottom"} withArrow shadow={"md"}>
                                <Popover.Target>
                                    <ActionIcon>
                                        <IconLayoutBottombarCollapse/>
                                    </ActionIcon>
                                </Popover.Target>
                                <Popover.Dropdown>
                                    {withTableAction({
                                        items,
                                    })}
                                </Popover.Dropdown>
                            </Popover>
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
                            {withTableAction && !withRowAction && <td></td>}
                            {withRowAction && <td>
                                <Popover
                                    position={"bottom"}
                                    withArrow
                                    shadow={"md"}
                                >
                                    <Popover.Target>
                                        <ActionIcon>
                                            <IconMenu/>
                                        </ActionIcon>
                                    </Popover.Target>
                                    <Popover.Dropdown>
                                        {withRowAction({
                                            item,
                                        })}
                                    </Popover.Dropdown>
                                </Popover>
                            </td>}
                            {$columns.map(([name, column]) => <td key={name}>
                                {isCallable(column.render) ? column.render(item) : (item as any)[column.render]}
                            </td>)}
                        </tr>)}
                </tbody>
            </CoolTable>
        </Box>
    </ScrollArea>;
};
