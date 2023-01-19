import logo              from "@/monye.one/assets/logo/logo.svg";
import {withTranslation} from "@leight/i18n-server";
import {DropZone}        from "@leight/mantine";
import {Box}             from "@mantine/core";
import {withBookLayout}  from "@monye.one/book";
import {TransactionMenu} from "@monye.one/transaction-client";

export default withBookLayout(() => {
    return (
        <>
            <Box
                p={"md"}
            >
                <TransactionMenu/>
                <DropZone
                    withTranslation={{label: "dropzone.import", namespace: "transaction"}}
                    withHintTranslation={{label: "dropzone.import.hint", namespace: "transaction"}}
                />
            </Box>
        </>
    );
}, {logo, href: "/book/transaction/list"});

export const getServerSideProps = withTranslation([
    "common",
    "book",
    "transaction"
]);
