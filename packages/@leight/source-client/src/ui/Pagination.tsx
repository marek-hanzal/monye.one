import {type ISourceStore}            from "@leight/source";
import {Pagination as CoolPagination} from "@mantine/core";
import {
    type ComponentProps,
    type FC
}                                     from "react";

export interface IPaginationProps extends Partial<ComponentProps<typeof CoolPagination>> {
    SourceStore: ISourceStore<any>;
}

export const Pagination: FC<IPaginationProps> = (
    {
        SourceStore,
        ...props
    }) => {
    const {page, pages, setPage} = SourceStore.Query.useState(({page, pages, setPage}) => ({page, pages, setPage}));
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
