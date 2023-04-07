import logo              from "@/monye.one/assets/logo/logo.svg";
import {withTranslation} from "@leight/i18n-server";
import {
    BookCalendar,
    CalendarEventQueryProvider,
    withBookLayout
}                        from "@monye.one/book-client";
import React             from "react";

export default withBookLayout(
    function CalendarPage() {
        return <>
            <CalendarEventQueryProvider>
            <BookCalendar/>
            </CalendarEventQueryProvider>
        </>;
    },
    {logo, href: "/book/calendar"}
);

export const getServerSideProps = withTranslation([
    "common",
    "book",
    "calendar",
]);
