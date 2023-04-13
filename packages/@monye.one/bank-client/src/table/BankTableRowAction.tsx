import {Translation}          from "@leight/i18n-client";
import {
    Menu,
    Text
}                             from "@mantine/core";
import {modals}               from "@mantine/modals";
import {TransactionImport}    from "@monye.one/transaction-client";
import {
    IconArrowsLeftRight,
    IconCash,
    IconMessageCircle,
    IconPhoto,
    IconSearch,
    IconTrash
}                             from "@tabler/icons-react";
import {type IBankTableProps} from "./BankTable";

export const BankTableRowAction: IBankTableProps["WithRowAction"] = ({item}) => {
    return <>
        <Menu.Label>[Importy]</Menu.Label>
        <Menu.Item
            onClick={() => modals.open({
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
        <Menu.Item icon={<IconMessageCircle size={14}/>}>Messages</Menu.Item>
        <Menu.Item icon={<IconPhoto size={14}/>}>Gallery</Menu.Item>
        <Menu.Item
            icon={<IconSearch size={14}/>}
            rightSection={<Text size="xs" color="dimmed">⌘K</Text>}
        >
            Search
        </Menu.Item>

        <Menu.Divider/>

        <Menu.Label>Danger zone</Menu.Label>
        <Menu.Item icon={<IconArrowsLeftRight size={14}/>}>Transfer my data</Menu.Item>
        <Menu.Item color="red" icon={<IconTrash size={14}/>}>Delete my account</Menu.Item>
    </>;
};
