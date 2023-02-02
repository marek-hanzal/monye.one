import logo from "@/monye.one/assets/logo/logo.svg";
import {withTranslation} from "@leight/i18n-server";
import {Box} from "@mantine/core";
import {AccountTable} from "@monye.one/account-client";
import {withBookLayout} from "@monye.one/book";

export default withBookLayout(
    function Accounts() {
        return (
            <>
                <h1>Accounts here!!</h1>
                <Box p={"md"}>
                    <AccountTable/>
                </Box>
            </>
        );
    },
    {logo, href: "/book/accounts"}
);

export const getServerSideProps = withTranslation([
    "common",
    "book",
    "account",
]);
