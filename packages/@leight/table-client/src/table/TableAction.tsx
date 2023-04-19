import {type FC} from "react";
import {
    type ITableColumn,
    type ITableInternalProps
}                from "./Table";

export interface ITableActionProps<TColumn extends ITableColumn> {
    WithTableAction?: FC<ITableInternalProps.IWithTableActionProps<TColumn>>;
    props: Omit<ITableInternalProps.IWithTableActionProps<TColumn>, "portal">;
}

export const TableAction = <TColumn extends ITableColumn>({WithTableAction, props}: ITableActionProps<TColumn>) => {
    if (!WithTableAction) {
        return null;
    }
    return <WithTableAction {...props}/>;
};
