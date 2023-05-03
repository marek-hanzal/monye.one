import {
    MenuLabel,
    Modal,
    ModalMenuItem,
    ModalStoreProvider
}                                    from "@leight/mantine";
import {TableActionMenu}             from "@leight/table-client";
import {Center}                      from "@mantine/core";
import {
    LabelControl,
    LabelCreateForm
}                                    from "@monye.one/label-client";
import {IconTags}                    from "@tabler/icons-react";
import {type ITransactionTableProps} from "./TransactionTable";

export const TransactionTableAction: ITransactionTableProps["WithTableAction"] = () => {
    return <ModalStoreProvider>
        <Modal
            modalId={"transaction.labels"}
            withTranslation={{
                namespace: "transaction",
            }}
            icon={<IconTags/>}
            title={"modal.transaction.label.title"}
        >
            <Center mt={"xl"}>
                <LabelControl
                    prepend={<LabelCreateForm
                        type={"@monye.one/transaction"}
                    />}
                    withAutoClose={["transaction.labels"]}
                    withTranslation={{
                        namespace: "translation",
                    }}
                    type={"@monye.one/transaction"}
                />
            </Center>
        </Modal>

        <TableActionMenu>
            <MenuLabel
                withTranslation={{
                    namespace: "common",
                    label:     "actions.label",
                }}
            />
            <ModalMenuItem
                modalId={"transaction.labels"}
                icon={<IconTags size={14}/>}
                withTranslation={{
                    namespace: "transaction",
                    label:     "label.button",
                }}
            />
        </TableActionMenu>
    </ModalStoreProvider>;
};
