import {
    CursorStore,
    Pagination
}                              from "@leight/cursor-client";
import {type IPaginationProps} from "@leight/cursor-client/src/cursor/Pagination";
import {Fulltext}              from "@leight/mantine";
import {SortIcon}              from "@leight/sort-client";
import {
    type ISourceSchemaType,
    type ISourceStore
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

export interface ISourceTableColumn<TSourceSchemaType extends ISourceSchemaType> extends ITableColumn<TSourceSchemaType["Dto"]> {
    readonly sort?: keyof TSourceSchemaType["Sort"];
}

export interface ISourceTableInternalProps<
    TSourceSchemaType extends ISourceSchemaType,
    TColumnKeys extends string,
> extends ITableProps<ISourceTableColumn<TSourceSchemaType>, TColumnKeys> {
    /**
     * Table schema used to infer all internal types.
     */
    schema: TSourceSchemaType["DtoSchema"];
    SourceStore: ISourceStore<TSourceSchemaType>;
    pagination?: {
        hideOnSingle?: boolean;
        /**
         * Where to put pagination, defaults to ["bottom","top"]
         */
        position?: ("top" | "bottom")[];

        props?: IPaginationProps;
    };
    withFulltext?: boolean;
}

/**
 * Public props which any component could extend from (non-partial).
 */
export type ISourceTableProps<
    TSourceSchemaType extends ISourceSchemaType,
    TColumnKeys extends string,
> = Omit<ISourceTableInternalProps<TSourceSchemaType, TColumnKeys>, "schema" | "SourceStore" | "columns" | "withTranslation">;

export const SourceTable = <
    TSourceSchemaType extends ISourceSchemaType,
    TColumnKeys extends string,
>(
    {
        schema,
        SourceStore,
        columns,
        pagination = {
            hideOnSingle: false,
            position:     [
                "top",
                "bottom"
            ],
        },
        withFulltext = false,
        ...props
    }: ISourceTableInternalProps<TSourceSchemaType, TColumnKeys>) => {
    const {
              dtos,
              isFetching,
              isLoading,
          } = SourceStore.Source.useState((
        {
            dtos,
            isFetching,
            isLoading,
        }) => (
        {
            dtos,
            isFetching,
            isLoading,
        }));

    const {sort, setSort} = SourceStore.Sort.useState(({sort, setSort}) => ({sort, setSort}));
    const {pages}         = CursorStore.useState(({pages}) => ({pages}));

    return <>
        {pagination?.position?.includes("top") && (pagination?.hideOnSingle ? pages > 1 : true) && <>
            <Center>
                <Pagination
                    {...pagination?.props}
                />
            </Center>
            <Divider mt={"md"}/>
        </>}
    {withFulltext && <>
        <Fulltext
            mt={"sm"}
            SourceStore={SourceStore}
            withTranslation={props.withTranslation}
        />
        <Divider mt={"sm"}/>
    </>}
        <Table<ISourceTableColumn<TSourceSchemaType>, TColumnKeys>
            mt={"sm"}
            isLoading={isLoading || isFetching}
            columns={Object.entries<ISourceTableColumn<TSourceSchemaType>>(columns).reduce<any>((prev, [name, column]) => {
                prev[name] = {
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
                            {column.sort ? <SortIcon<TSourceSchemaType["Sort"]> sort={sort} index={column.sort}/> : null}
                            {children}
                        </>;
                    }),
                };
                return prev;
            }, {})}
            items={dtos.filter(dto => schema.safeParse(dto).success)}
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
    </>;
};
