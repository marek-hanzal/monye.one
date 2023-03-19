import logo              from "@/monye.one/assets/logo/logo.svg";
import {withTranslation} from "@leight/i18n-server";
import {ImportZone}      from "@leight/xlsx-import-client";
import {Box}             from "@mantine/core";
import {withBookLayout}  from "@monye.one/book";
import {TransactionMenu} from "@monye.one/transaction-client";
import {trpc}            from "@monye.one/trpc-client";

export default withBookLayout(
    function Import() {
        const context = trpc.useContext();
        return <Box p={"md"}>
            <TransactionMenu/>
            <ImportZone
                useJobFindQuery={trpc.job.source.find.useQuery}
                mutation={trpc.import.xlsx.job}
                onSuccess={() => {
                    context.transaction.source.query.invalidate();
                    context.transaction.source.count.invalidate();
                }}
                withTranslation={{
                    label:     "dropzone.import",
                    namespace: "transaction",
                }}
            />
        </Box>;
    },
    {logo, href: "/book/transaction/list"}
);

export const getServerSideProps = withTranslation([
    "common",
    "book",
    "transaction",
]);
