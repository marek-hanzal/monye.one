import {Pagination as CoolPagination} from "@mantine/core";
import {
    type ComponentProps,
    type FC
}                                     from "react";
import {CursorStore}                  from "../context";

export interface IPaginationProps extends Partial<ComponentProps<typeof CoolPagination>> {
}

export const Pagination: FC<IPaginationProps> = ({...props}) => {
    const {page, pages, setPage} = CursorStore.useState(({page, pages, setPage}) => ({page, pages, setPage}));
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
