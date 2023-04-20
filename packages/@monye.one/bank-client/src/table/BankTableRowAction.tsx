import {Translation}            from "@leight/i18n-client";
import {
    DeleteModal,
    MenuLabel,
    ModalMenuItem,
    ModalStoreProvider
}                               from "@leight/mantine";
import {TableRowMenu}           from "@leight/table-client";
import {BlockProvider}          from "@leight/utils-client";
import {Menu}                   from "@mantine/core";
import {modals}                 from "@mantine/modals";
import {type IBankSourceSchema} from "@monye.one/bank";
import {TransactionImport}      from "@monye.one/transaction-client";
import {
    IconCash,
    IconEdit,
    IconTrash
}                               from "@tabler/icons-react";
import {BankEditForm}           from "../form/BankEditForm";
import {
    useBankQueryInvalidator,
    UseBankSourceQuery
}                               from "../sdk";
import {type IBankTableProps}   from "./BankTable";


export const BankTableRowAction: IBankTableProps["WithRowAction"] = ({item}) => {
    return <>
        <ModalStoreProvider>
            <DeleteModal<IBankSourceSchema>
                invalidator={useBankQueryInvalidator()}
                UseDeleteMutation={UseBankSourceQuery}
                withTranslation={{
                    namespace: "bank",
                    label:     "account",
                }}
                entity={item}
            />
            <TableRowMenu>
                <MenuLabel
                    withTranslation={{
                        namespace: "common",
                        label:     "actions.label",
                    }}
                />
                <Menu.Item
                    onClick={() => modals.open({
                        zIndex:              500,
                        modalId:             "balance.edit",
                        closeOnClickOutside: false,
                        title:               <Translation
                                                 namespace={"bank"}
                                                 label={"modal.account.edit.title"}
                                                 values={item}
                                             />,
                        size:                "lg",
                        children:            <BlockProvider>
                                                 <BankEditForm
                                                     onSuccess={() => modals.close("balance.edit")}
                                                     dto={item}
                                                 />
                                             </BlockProvider>,
                    })}
                    icon={<IconEdit size={14}/>}
                >
                    <Translation
                        namespace={"bank"}
                        label={"account.edit.button"}
                    />
                </Menu.Item>
                <Menu.Item
                    onClick={() => modals.open({
                        zIndex:   500,
                        modalId:  "import",
                        title:    <Translation
                                      namespace={"bank"}
                                      label={"modal.transaction.import.title"}
                                      values={item}
                                  />,
                        size:     "lg",
                        children: <>
                                      <TransactionImport
                                          account={item.account}
                                          onUpload={() => setTimeout(() => modals.close("import"), 500)}
                                      />
                                  </>
                    })}
                    icon={<IconCash size={14}/>}
                >
                    <Translation
                        namespace={"bank"}
                        label={"transaction.upload.button"}
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
                    color={"red"}
                    icon={<IconTrash size={14}/>}
                    withTranslation={{
                        namespace: "bank",
                        label:     "account.delete.button",
                    }}
                />
            </TableRowMenu>
        </ModalStoreProvider>
    </>;
};
