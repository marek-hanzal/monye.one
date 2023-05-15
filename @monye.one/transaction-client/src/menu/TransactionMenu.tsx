import {
    type ITabLinkMenuProps,
    TabLinkMenu
}                        from "@leight/mantine";
import {IconFileImport}  from "@tabler/icons-react";
import {type FC}         from "react";
import {IconTransaction} from "../icon";

export interface ITransactionMenuProps extends Partial<ITabLinkMenuProps> {
}

export const TransactionMenu: FC<ITransactionMenuProps> = (props) => {
    return <TabLinkMenu
        items={[
            {
                icon:            <IconTransaction/>,
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
