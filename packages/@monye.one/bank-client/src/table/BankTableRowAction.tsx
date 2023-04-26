import {Translation}                from "@leight/i18n-client";
import {
    DeleteModal,
    Drawer,
    DrawerMenuItem,
    DrawerStoreProvider,
    MenuLabel,
    ModalMenuItem,
    ModalStoreProvider
}                                   from "@leight/mantine";
import {TableRowMenu}               from "@leight/table-client";
import {Menu}                       from "@mantine/core";
import {modals}                     from "@mantine/modals";
import {type IBankSourceSchemaType} from "@monye.one/bank";
import {TransactionImport}          from "@monye.one/transaction-client";
import {trpc}                       from "@monye.one/trpc-client";
import {
    IconCash,
    IconEdit,
    IconRefresh,
    IconTrash
}                                   from "@tabler/icons-react";
import {BankEditForm}               from "../form/BankEditForm";
import {
    BankSourceStore,
    useBankQueryInvalidator
}                                   from "../sdk";
import {withStatsJobNotification}   from "../utils";
import {type IBankTableProps}       from "./BankTable";


export const BankTableRowAction: IBankTableProps["WithRowAction"] = ({item}) => {
    const bankStatsMutation = trpc.bank.stats.useMutation();
    return <ModalStoreProvider>
        <DrawerStoreProvider>
            <DeleteModal<IBankSourceSchemaType>
                modalId={"bank.delete"}
                invalidator={useBankQueryInvalidator()}
                SourceStore={BankSourceStore}
                withTranslation={{
                    namespace: "bank",
                    label:     "account",
                }}
                entity={item}
            />

            <Drawer
                drawerId={"bank.edit"}
                closeOnClickOutside={false}
                withTranslation={{
                    namespace: "bank",
                    label:     "modal.account.edit.title",
                    values:    item,
                }}
            >
                <BankEditForm
                    withAutoClose={["bank.edit"]}
                    onSuccess={() => modals.close("bank.edit")}
                    dto={item}
                />
            </Drawer>

            <Drawer
                drawerId={"bank.import"}
                withTranslation={{
                    namespace: "bank",
                    label:     "modal.transaction.import.title",
                    values:    item,
                }}
            >
                <TransactionImport
                    account={item.account}
                    onUpload={() => setTimeout(() => modals.close("import"), 500)}
                />
            </Drawer>

            <TableRowMenu>
                <MenuLabel
                    withTranslation={{
                        namespace: "common",
                        label:     "actions.label",
                    }}
                />
                <DrawerMenuItem
                    drawerId={"bank.edit"}
                    icon={<IconEdit size={14}/>}
                    withTranslation={{
                        namespace: "bank",
                        label:     "account.edit.button",
                    }}
                />
                <DrawerMenuItem
                    drawerId={"bank.import"}
                    icon={<IconCash size={14}/>}
                    withTranslation={{
                        namespace: "bank",
                        label:     "transaction.upload.button",
                    }}
                />
                <Menu.Item
                    icon={<IconRefresh size={14}/>}
                    onClick={() => {
                        bankStatsMutation.mutate(
                            {
                                bankId: item.id,
                            },
                            withStatsJobNotification({bank: item})
                        );
                    }}
                    disabled={bankStatsMutation.isLoading}
                >
                    <Translation
                        namespace={"bank"}
                        label={"stats.update.button"}
                    />
                </Menu.Item>
                <Menu.Divider/>
                <MenuLabel
                    withTranslation={{
                        namespace: "common",
                        label:     "actions.danger.label",
                    }}
                />
                <ModalMenuItem
                    modalId={"bank.delete"}
                    color={"red"}
                    icon={<IconTrash size={14}/>}
                    withTranslation={{
                        namespace: "bank",
                        label:     "account.delete.button",
                    }}
                />
            </TableRowMenu>
        </DrawerStoreProvider>
    </ModalStoreProvider>;
};
