import logo              from "@/monye.one/assets/logo/logo.svg";
import {
    Calendar,
    CalendarProvider
}                        from "@leight/calendar-client";
import {withTranslation} from "@leight/i18n-server";
import {withBookLayout}  from "@monye.one/book";
import React             from "react";

export default withBookLayout(
    function CalendarPage() {
        return <>
            <CalendarProvider>
                <Calendar/>
            </CalendarProvider>
        </>;
    },
    {logo, href: "/book/calendar"}
);

export const getServerSideProps = withTranslation([
    "common",
    "book",
    "calendar",
]);
