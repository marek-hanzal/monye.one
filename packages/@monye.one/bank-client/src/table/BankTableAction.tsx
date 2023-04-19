import {
    Drawer,
    DrawerMenuItem,
    DrawerStoreProvider,
    MenuLabel
}                             from "@leight/mantine";
import {TableActionMenu}      from "@leight/table-client";
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
            closeOnClickOutside={false}
            withTranslation={{
                namespace: "bank",
            }}
            icon={<IconBank/>}
            title={"modal.account.create.title"}
        >
            <Divider/>
            <Box m={"sm"}>
                <BankCreateForm/>
            </Box>
        </Drawer>
        <TableActionMenu>
            <MenuLabel
                withTranslation={{
                    namespace: "common",
                    label:     "actions.label",
                }}
            />
            <DrawerMenuItem
                icon={<IconCash size={14}/>}
                withTranslation={{
                    namespace: "bank",
                    label:     "account.create.button",
                }}
            />
        </TableActionMenu>
    </DrawerStoreProvider>;
};
