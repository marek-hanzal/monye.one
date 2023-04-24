import logo               from "@/monye.one/assets/logo/logo.svg";
import {FulltextProvider} from "@leight/filter-client";
import {withTranslation}  from "@leight/i18n-server";
import {Paper}            from "@leight/mantine";
import {Box}              from "@mantine/core";
import {withBookLayout}   from "@monye.one/book-client";
import {
    SumByInline,
    TransactionMenu,
    TransactionQueryProvider,
    TransactionTable,
}                         from "@monye.one/transaction-client";

export default withBookLayout(
    function List() {
        return <Box p={"md"}>
            <TransactionMenu/>
            <FulltextProvider>
                <TransactionQueryProvider
                    defaultSort={{
                        date: "desc",
                    }}
                >
                    <Paper>
                        <SumByInline/>
                        <TransactionTable/>
                    </Paper>
                </TransactionQueryProvider>
            </FulltextProvider>
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
