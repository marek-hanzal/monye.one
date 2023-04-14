import {Translation}          from "@leight/i18n-client";
import {
    Divider,
    Menu
}                             from "@mantine/core";
import {modals}               from "@mantine/modals";
import {IconCash}             from "@tabler/icons-react";
import {BankCreateForm}       from "../form";
import {type IBankTableProps} from "./BankTable";

export const BankTableAction: IBankTableProps["WithTableAction"] = () => {
    return <>
        <Menu.Label>
            <Translation
                namespace={"common"}
                label={"actions.label"}
            />
        </Menu.Label>
        <Menu.Item
            onClick={() => modals.open({
                modalId:  "import",
                title:    <Translation
                              namespace={"bank"}
                              label={"modal.account.create.title"}
                          />,
                size:     "lg",
                children: <>
                              <Divider size={"sm"}/>
                              <BankCreateForm/>
                          </>
            })}
            icon={<IconCash size={14}/>}
        >
            <Translation
                namespace={"bank"}
                label={"account.create.button"}
            />
        </Menu.Item>
    </>;
};
