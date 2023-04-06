import logo              from "@/monye.one/assets/logo/logo.svg";
import {withTranslation} from "@leight/i18n-server";
import {
    BookCalendar,
    withBookLayout
}                        from "@monye.one/book-client";
import React             from "react";

export default withBookLayout(
    function CalendarPage() {
        return <>
            <BookCalendar/>
        </>;
    },
    {logo, href: "/book/calendar"}
);

export const getServerSideProps = withTranslation([
    "common",
    "book",
    "calendar",
]);
