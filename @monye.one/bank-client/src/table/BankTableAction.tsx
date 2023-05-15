import {
    Drawer,
    DrawerMenuItem,
    DrawerStoreProvider,
    MenuLabel
}                             from "@leight/mantine";
import {TableActionMenu}      from "@leight/table-client";
import {BlockProvider}        from "@leight/utils-client";
import {
    Box,
    Divider
}                             from "@mantine/core";
import {IconCash}             from "@tabler/icons-react";
import {BankCreateForm}       from "../form";
import {IconBank}             from "../icon";
import {type IBankTableProps} from "./BankTable";

export const BankTableAction: IBankTableProps["WithTableAction"] = () => {
    return <DrawerStoreProvider>
        <Drawer
            drawerId={"bank.create"}
            closeOnClickOutside={false}
            withTranslation={{
                namespace: "bank",
            }}
            icon={<IconBank/>}
            title={"modal.account.create.title"}
        >
            <BlockProvider>
                <Divider/>
                <Box m={"sm"}>
                    <BankCreateForm
                        withAutoClose={["bank.create"]}
                    />
                </Box>
            </BlockProvider>
        </Drawer>
        <TableActionMenu>
            <MenuLabel
                withTranslation={{
                    namespace: "common",
                    label:     "actions.label",
                }}
            />
            <DrawerMenuItem
                drawerId={"bank.create"}
                icon={<IconCash size={14}/>}
                withTranslation={{
                    namespace: "bank",
                    label:     "account.create.button",
                }}
            />
        </TableActionMenu>
    </DrawerStoreProvider>;
};
