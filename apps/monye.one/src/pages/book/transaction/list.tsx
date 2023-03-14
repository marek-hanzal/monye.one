import logo              from "@/monye.one/assets/logo/logo.svg";
import {withTranslation} from "@leight/i18n-server";
import {Box}             from "@mantine/core";
import {withBookLayout}  from "@monye.one/book";
import {
    TransactionMenu,
    TransactionTable,
}                        from "@monye.one/transaction-client";
import {trpc}            from "@monye.one/trpc-client";

export default withBookLayout(
    function List() {
        const query = trpc.transaction.source.query.useQuery();
        console.log(query.data);
        return (
            <>
                <Box p={"md"}>
                    <TransactionMenu/>
                    <TransactionTable/>
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
