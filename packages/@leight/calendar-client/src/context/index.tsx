import {type DateTime}    from "@leight/i18n";
import {
    type FC,
    type PropsWithChildren
}                         from "react";
import {MonthsOfProvider} from "./MonthsOfStore";
import {WeeksOfProvider}  from "./WeeksOfStore";
import {YearsOfProvider}  from "./YearsOfStore";

export type ICalendarProviderProps = PropsWithChildren<{
    date?: DateTime;
}>;

export const CalendarProvider: FC<ICalendarProviderProps> = ({children, date}) => {
    return <YearsOfProvider
        date={date}
    >
        <MonthsOfProvider
            date={date}
        >
            <WeeksOfProvider
                date={date}
            >
                {children}
            </WeeksOfProvider>
        </MonthsOfProvider>
    </YearsOfProvider>;
};

export * from "./MonthsOfStore";
export * from "./WeeksOfStore";
export * from "./YearsOfStore";
