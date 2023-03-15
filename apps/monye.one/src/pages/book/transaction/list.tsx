import logo              from "@/monye.one/assets/logo/logo.svg";
import {withTranslation} from "@leight/i18n-server";
import {Box}             from "@mantine/core";
import {withBookLayout}  from "@monye.one/book";
import {
    TransactionMenu,
    TransactionQueryProvider,
    TransactionTable,
}                        from "@monye.one/transaction-client";

export default withBookLayout(
    function List() {
        return (
            <>
                <Box p={"md"}>
                    <TransactionMenu/>
                    <TransactionQueryProvider
                        defaults={{

                        }}
                    >
                        <TransactionTable/>
                    </TransactionQueryProvider>
                </Box>
            </>
        );
    },
    {logo, href: "/book/transaction/list"}
);

export const getServerSideProps = withTranslation([
    "common",
    "book",
    "transaction",
]);
