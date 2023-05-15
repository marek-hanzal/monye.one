import {
    type ITabLinkMenuProps,
    TabLinkMenu
}                  from "@leight/mantine";
import {ThemeIcon} from "@mantine/core";
import {
    IconCalendarDollar,
    IconCalendarEvent,
    IconCalendarTime
}                  from "@tabler/icons-react";
import {type FC}   from "react";

export interface ICalendarMenuProps extends Partial<ITabLinkMenuProps> {
}

export const CalendarMenu: FC<ICalendarMenuProps> = (props) => {
    return <TabLinkMenu
        items={[
            {
                icon:            <ThemeIcon
                                     variant={"light"}
                                     color={"gray"}
                                 >
                                     <IconCalendarTime/>
                                 </ThemeIcon>,
                withTranslation: {
                    label:     "tab.calendar.days",
                    namespace: "book",
                },
                href:            {
                    href: "/book/calendar/days",
                },
            },
            {
                icon:            <ThemeIcon
                                     variant={"light"}
                                     color={"gray"}
                                 >
                                     <IconCalendarEvent/>
                                 </ThemeIcon>,
                withTranslation: {
                    label:     "tab.calendar.months",
                    namespace: "book",
                },
                href:            {
                    href: "/book/calendar/months",
                },
            },
            {
                icon:            <ThemeIcon
                                     variant={"light"}
                                     color={"gray"}
                                 >
                                     <IconCalendarDollar/>
                                 </ThemeIcon>,
                withTranslation: {
                    label:     "tab.calendar.years",
                    namespace: "book",
                },
                href:            {
                    href: "/book/calendar/years",
                },
            },
        ]}
        {...props}
    />;
};
