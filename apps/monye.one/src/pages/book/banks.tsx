import logo              from "@/monye.one/assets/logo/logo.svg";
import {withTranslation} from "@leight/i18n-server";
import {Paper}           from "@leight/mantine";
import {Box}             from "@mantine/core";
import {
    BankQueryProvider,
    BankTable
}                        from "@monye.one/bank-client";
import {withBookLayout}  from "@monye.one/book-client";

export default withBookLayout(
    function Banks() {
        return (
            <>
                <Box p={"md"}>
                    <BankQueryProvider
                        defaultSort={{
                            account: "asc",
                        }}
                    >
                        <Paper>
                            <BankTable/>
                        </Paper>
                    </BankQueryProvider>
                </Box>
            </>
        );
    },
    {logo, href: "/book/banks"}
);

export const getServerSideProps = withTranslation([
    "common",
    "book",
    "bank",
]);
