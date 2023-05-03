import logo               from "@/monye.one/assets/logo/logo.svg";
import {withTranslation}  from "@leight/i18n-server";
import {Paper}            from "@leight/mantine";
import {FulltextProvider} from "@leight/source-client";
import {Box}              from "@mantine/core";
import {withBookLayout}   from "@monye.one/book-client";
import {LabelControl}     from "@monye.one/label-client";
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
                        <LabelControl
                            type={"@monye.one/transaction"}
                        />
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
    "filter",
    "transaction",
]);
