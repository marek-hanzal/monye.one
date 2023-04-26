import {type ISourceStore}            from "@leight/source";
import {Pagination as CoolPagination} from "@mantine/core";
import {
    type ComponentProps,
    type FC,
    useEffect
}                                     from "react";

export interface IPaginationProps extends Partial<ComponentProps<typeof CoolPagination>> {
    SourceStore: ISourceStore<any>;
    size?: number;
}

export const Pagination: FC<IPaginationProps> = (
    {
        SourceStore,
        size = 30,
        ...props
    }) => {
    const $cacheTime                             = 120;
    /**
     * @TODO Remove pages from query, keep it just here (nothing else cares about pages)
     */
    const {query, page, pages, setSize, setPage} = SourceStore.Query.useState(({query, page, pages, setSize, setPage}) => ({query, page, pages, setSize, setPage}));
    const result                                 = SourceStore.use.useCount(query, {
        cacheTime: $cacheTime,
        staleTime: $cacheTime,
    });

    useEffect(() => {
        result.isSuccess && setSize(size, result.data);
    }, [
        result.isSuccess,
        size,
        result
    ]);

    return <CoolPagination
        withEdges
        size={"md"}
        radius={"sm"}
        total={pages}
        boundaries={2}
        siblings={2}
        value={page + 1}
        onChange={page => setPage(page - 1)}
        {...props}
    />;
};
