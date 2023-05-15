import logo                from "@/monye.one/assets/logo/logo.svg";
import {withTranslation}   from "@leight/i18n-server";
import {Paper}             from "@leight/mantine";
import {Box}               from "@mantine/core";
import {withBookLayout}    from "@monye.one/book-client";
import {TransactionMenu}   from "@monye.one/transaction-client";
import {TransactionImport} from "@monye.one/transaction-ex-client";

export default withBookLayout(
    function Import() {
        return <Box p={"md"}>
            <TransactionMenu/>
            <Paper>
                <TransactionImport/>
            </Paper>
        </Box>;
    },
    {logo, href: "/book/transaction/list"}
);

export const getServerSideProps = withTranslation([
    "common",
    "book",
    "bank",
    "transaction",
]);
