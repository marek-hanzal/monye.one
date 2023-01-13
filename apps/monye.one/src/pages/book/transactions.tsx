import logo               from "@/monye.one/assets/logo/logo.svg";
import {withTranslation}  from "@leight/i18n-server";
import {Box}              from "@mantine/core";
import {withBookLayout}   from "@monye.one/book";
import {TransactionTable} from "@monye.one/transaction-client";

export default withBookLayout(function Index() {
    return (
        <>
            <h1>Transactions here!!</h1>
            <Box
                p={"md"}
            >
                <TransactionTable/>
            </Box>
        </>
    );
}, {logo, href: "/book/transactions"});

export const getServerSideProps = withTranslation([
    "common",
    "book",
    "transaction"
]);
