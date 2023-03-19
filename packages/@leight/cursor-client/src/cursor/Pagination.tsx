import {
    Loader,
    Pagination as CoolPagination
}                       from "@mantine/core";
import {
    type ComponentProps,
    type FC
}                       from "react";
import {useCursorState} from "../context";

export interface IPaginationProps extends Partial<ComponentProps<typeof CoolPagination>> {
}

export const Pagination: FC<IPaginationProps> = ({...props}) => {
    const {page, pages, setPage, isLoading} = useCursorState(({page, pages, setPage, isLoading}) => ({page, pages, setPage, isLoading}));
    if (isLoading) {
        return <Loader variant="dots"/>;
    }
    return pages > 0 ? <CoolPagination
        withEdges
        size={"lg"}
        radius={"sm"}
        total={pages}
        boundaries={3}
        siblings={3}
        value={page + 1}
        onChange={page => setPage(page - 1)}
        {...props}
    /> : null;
};
