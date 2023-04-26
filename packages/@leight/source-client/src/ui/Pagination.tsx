import {type ISourceStore}            from "@leight/source";
import {Pagination as CoolPagination} from "@mantine/core";
import {
    type ComponentProps,
    type FC
}                                     from "react";

export interface IPaginationProps extends Partial<ComponentProps<typeof CoolPagination>> {
    SourceStore: ISourceStore<any>;
    hideOnSingle?: boolean;
}

export const Pagination: FC<IPaginationProps> = (
    {
        SourceStore,
        hideOnSingle = false,
        ...props
    }) => {
    const $cacheTime       = 120;
    const {query, setPage} = SourceStore.Query.useState(({query, setPage}) => ({query, setPage}));
    const result           = SourceStore.use.useCount(query, {
        cacheTime: $cacheTime,
        staleTime: $cacheTime,
    });
    const pages            = Math.ceil((result.data || 0) / query.cursor.size);
    return hideOnSingle && pages === 0 ? null : <CoolPagination
        withEdges
        size={"md"}
        radius={"sm"}
        total={pages}
        boundaries={2}
        siblings={2}
        value={query.cursor.page + 1}
        onChange={page => setPage(page - 1)}
        {...props}
    />;
};
