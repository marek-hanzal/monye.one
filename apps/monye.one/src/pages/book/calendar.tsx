import logo              from "@/monye.one/assets/logo/logo.svg";
import {withTranslation} from "@leight/i18n-server";
import {Box}             from "@mantine/core";
import {
    CalendarOverviewProvider,
    withBookLayout
}                        from "@monye.one/book-client";

export default withBookLayout(
    function CalendarPage() {
        return <Box p={"md"}>
            <CalendarOverviewProvider/>
        </Box>;
    },
    {logo, href: "/book/calendar"}
);

export const getServerSideProps = withTranslation([
    "common",
    "book",
    "calendar",
    "transaction",
]);
