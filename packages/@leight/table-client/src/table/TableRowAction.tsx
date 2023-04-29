import {type FC} from "react";
import {
    type ITableColumn,
    type ITableInternalProps
}                from "./Table";

export interface ITableRowActionProps<TColumn extends ITableColumn> {
    WithRowAction?: FC<ITableInternalProps.IWithRowActionProps<TColumn>>;
    props: ITableInternalProps.IWithRowActionProps<TColumn>;
}

export const TableRowAction = <TColumn extends ITableColumn>({WithRowAction, props}: ITableRowActionProps<TColumn>) => {
    if (!WithRowAction) {
        return null;
    }
    return <WithRowAction {...props}/>;
};
