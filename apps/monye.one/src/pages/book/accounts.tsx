import logo from "@/monye.one/assets/logo/logo.svg";
import { withTranslation } from "@leight/i18n-server";
import { Box, LoadingOverlay } from "@mantine/core";
import { AccountTable } from "@monye.one/account-client";
import { withBookLayout } from "@monye.one/book";
import { trpc } from "@monye.one/trpc-client";
import { useEffect } from "react";

export default withBookLayout(
    () => {
        const result = trpc.foo.useQuery();
        const result2 = trpc.import.xlsx.job.useMutation();
        useEffect(() => {
            result2.mutate({
                fileId: "123",
            });
        }, []);

        console.log("R", result2.data);
        return (
            <>
                <h1>Accounts here!!</h1>
                <div>
                    <LoadingOverlay
                        transitionDuration={2500}
                        visible={result.isFetching}
                    />
                    {result.isSuccess &&
                        result.data.map((item) => <h2 key={item}>{item}</h2>)}
                </div>
                <Box p={"md"}>
                    <AccountTable />
                </Box>
            </>
        );
    },
    { logo, href: "/book/accounts" }
);

export const getServerSideProps = withTranslation([
    "common",
    "book",
    "account",
]);
