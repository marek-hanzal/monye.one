import {Translation}          from "@leight/i18n-client";
import {
    Box,
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
                zIndex:              500,
                modalId:             "import",
                closeOnClickOutside: false,
                title:               <Translation
                                         namespace={"bank"}
                                         label={"modal.account.create.title"}
                                     />,
                size:                "lg",
                children:            <>
                                         <Divider/>
                                         <Box m={"sm"}>
                                             <BankCreateForm/>
                                         </Box>
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
