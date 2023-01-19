import {
    type ITabLinkMenuProps,
    TabLinkMenu
}                from "@leight/mantine";
import {
    IconFileImport,
    IconList
}                from "@tabler/icons";
import {type FC} from "react";

export interface ITransactionMenuProps extends Partial<ITabLinkMenuProps> {
}

export const TransactionMenu: FC<ITransactionMenuProps> = props => {
    return <TabLinkMenu
        items={[
            {
                icon:            <IconList/>,
                withTranslation: {
                    label:     "tab.transactions",
                    namespace: "transaction",
                },
                href:            {
                    href: "/book/transaction/list",
                },
            },
            {
                icon:            <IconFileImport/>,
                withTranslation: {
                    label:     "tab.import",
                    namespace: "transaction",
                },
                href:            {
                    href: "/book/transaction/import",
                },
            },
        ]}
        {...props}
    />;
};
