import logo              from "@/monye.one/assets/logo/logo.svg";
import {withTranslation} from "@leight/i18n-server";
import {Box}             from "@mantine/core";
import {
    BankQueryProvider,
    BankTable
}                        from "@monye.one/bank-client";
import {withBookLayout}  from "@monye.one/book";

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
                        <BankTable/>
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
