import logo               from "@/monye.one/assets/logo/logo.svg";
import {withTranslation}  from "@leight/i18n-server";
import {DropZone}         from "@leight/mantine";
import {
    Box,
    Tabs
}                         from "@mantine/core";
import {withBookLayout}   from "@monye.one/book";
import {TransactionTable} from "@monye.one/transaction-client";
import {
    IconFileImport,
    IconList
}                         from "@tabler/icons";
import {useTranslation}   from "next-i18next";

export default withBookLayout(() => {
    const {t} = useTranslation("transaction");
    return (
        <>
            <Box
                p={"md"}
            >
                <Tabs defaultValue={"transactions"}>
                    <Tabs.List>
                        <Tabs.Tab
                            icon={<IconList/>}
                            value={"transactions"}
                        >
                            {t("tab.transactions")}
                        </Tabs.Tab>
                        <Tabs.Tab
                            icon={<IconFileImport/>}
                            value={"import"}
                        >
                            {t("tab.import")}
                        </Tabs.Tab>
                    </Tabs.List>
                    <Tabs.Panel value={"transactions"}>
                        <TransactionTable/>
                    </Tabs.Panel>
                    <Tabs.Panel value={"import"}>
                        <DropZone/>
                    </Tabs.Panel>
                </Tabs>
            </Box>
        </>
    );
}, {logo, href: "/book/transactions"});

export const getServerSideProps = withTranslation([
    "common",
    "book",
    "transaction"
]);
