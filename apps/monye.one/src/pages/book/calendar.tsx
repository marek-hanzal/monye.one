import logo              from "@/monye.one/assets/logo/logo.svg";
import {
    Calendar,
    CalendarProvider
}                        from "@leight/calendar-client";
import {withTranslation} from "@leight/i18n-server";
import {Box}             from "@mantine/core";
import {withBookLayout}  from "@monye.one/book";
import React             from "react";

export default withBookLayout(
    function CalendarPage() {
        return (
            <>
                <Box p={"md"}>
                    <CalendarProvider
                        options={{
                            // minDate:        new Date("2020-01-01"),
                            // maxDate:        new Date("2030-31-12"),
                            firstDayOfWeek: 1,
                            onDateSelected: date => {
                                console.log(date);
                            },
                        }}
                    >
                        <Calendar/>
                    </CalendarProvider>
                </Box>
            </>
        );
    },
    {logo, href: "/book/calendar"}
);

export const getServerSideProps = withTranslation([
    "common",
    "book",
    "calendar",
]);
