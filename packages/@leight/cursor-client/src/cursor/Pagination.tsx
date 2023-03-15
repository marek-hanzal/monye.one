import {type IQuerySchema}            from "@leight/query";
import {type IUseQueryStore}          from "@leight/query-client";
import {Pagination as CoolPagination} from "@mantine/core";
import {
    type ComponentProps,
    type FC
}                                     from "react";

export interface IPaginationProps extends Partial<ComponentProps<typeof CoolPagination>> {
    readonly useQuery: IUseQueryStore<IQuerySchema>;
}

export const Pagination: FC<IPaginationProps> = ({useQuery, ...props}) => {
    const {page, setPage} = useQuery(({query: {cursor}, setPage}) => ({setPage, page: cursor?.page || 0}));
    return <CoolPagination
        withEdges
        size={"lg"}
        radius={"sm"}
        total={20}
        siblings={2}
        value={page + 1}
        onChange={page => setPage(page - 1)}
        {...props}
    />;
};
