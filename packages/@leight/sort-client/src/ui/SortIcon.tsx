import {type ISort} from "@leight/sort";
import {
    IconArrowsSort,
    IconSortAscending2,
    IconSortDescending2
}                   from "@tabler/icons-react";

export interface ISortIconProps<TSort extends ISort> {
    index: keyof TSort;
    sort: TSort;
}

export const SortIcon = <TSort extends ISort>({index, sort}: ISortIconProps<TSort>) => {
    switch (sort[index]) {
        case "asc":
            return <IconSortAscending2 color={"grey"}/>;
        case "desc":
            return <IconSortDescending2 color={"grey"}/>;
        default:
            return <IconArrowsSort color={"lightgrey"}/>;
    }
};
