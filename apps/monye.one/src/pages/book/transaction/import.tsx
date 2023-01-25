import logo from "@/monye.one/assets/logo/logo.svg";
import { withTranslation } from "@leight/i18n-server";
import { ImportZone } from "@leight/xlsx-import-client";
import { Box, Divider } from "@mantine/core";
import { withBookLayout } from "@monye.one/book";
import { TransactionMenu } from "@monye.one/transaction-client";

export default withBookLayout(
    () => {
        return (
            <>
                <Box p={"md"}>
                    <TransactionMenu />
                    <ImportZone
                        withTranslation={{
                            label: "dropzone.import",
                            namespace: "transaction",
                        }}
                    />
                    <Divider m={"md"} /># show import jobs here.
                </Box>
            </>
        );
    },
    { logo, href: "/book/transaction/list" }
);

export const getServerSideProps = withTranslation([
    "common",
    "book",
    "transaction",
]);
