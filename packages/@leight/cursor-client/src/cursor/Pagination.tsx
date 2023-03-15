import {Pagination as CoolPagination} from "@mantine/core";
import {
    type ComponentProps,
    type FC
}                                     from "react";
import {useCursorState}               from "../context";

export interface IPaginationProps extends Partial<ComponentProps<typeof CoolPagination>> {
}

export const Pagination: FC<IPaginationProps> = ({...props}) => {
    const {page, pages, setPage} = useCursorState(({page, pages, setPage}) => ({page, pages, setPage}));
    return pages > 0 ? <CoolPagination
        withEdges
        size={"lg"}
        radius={"sm"}
        total={pages}
        siblings={2}
        value={page + 1}
        onChange={page => setPage(page - 1)}
        {...props}
    /> : null;
};
