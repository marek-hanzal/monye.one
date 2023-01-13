import logo              from "@/monye.one/assets/logo/logo.svg";
import {withTranslation} from "@leight/i18n-server";
import {Box}             from "@mantine/core";
import {withBookLayout}  from "@monye.one/book";

export default withBookLayout(function Index() {
    return (
        <>
            <h1>Filters here!!</h1>
            <Box
                p={"md"}
            >
            </Box>
        </>
    );
}, {logo, href: "/book/filters"});

export const getServerSideProps = withTranslation([
    "common",
    "book",
    "filter",
]);
