import logo              from "@/monye.one/assets/logo/logo.svg";
import {withTranslation} from "@leight/i18n-server";
import {Box}             from "@mantine/core";
import {
    CalendarMenu,
    CalendarOverviewProvider,
    withBookLayout
}                        from "@monye.one/book-client";

export default withBookLayout(
    function CalendarPage() {
        return <Box p={"md"}>
            <CalendarMenu/>
            <CalendarOverviewProvider/>
        </Box>;
    },
    {logo, href: "/book/calendar/years"}
);

export const getServerSideProps = withTranslation([
    "common",
    "book",
    "calendar",
    "transaction",
]);
