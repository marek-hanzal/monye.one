import {WithHighlight} from "@leight/mantine";
import {type FC}       from "react";
import {
    FilterSourceTable,
    type IFilterSourceTableProps
}                      from "../sdk";

export type IFilterTableColumns =
    | "name";

export interface IFilterTableProps extends IFilterSourceTableProps<IFilterTableColumns> {
}

export const FilterTable: FC<IFilterTableProps> = props => {
    return <FilterSourceTable
        pagination={{
            hideOnSingle: true,
            position:     ["bottom"],
            props:        {
                withControls: false,
            },
        }}
        withTranslation={{
            namespace: "filter",
        }}
        columns={{
            name: {
                render: ({item: {name}, highlight}) => <WithHighlight text={name} highlight={highlight}/>,
            },
        }}
        {...props}
    />;
};
