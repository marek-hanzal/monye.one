import {Button}                from "@mantine/core";
import {type FC}               from "react";
import {
    NextButton,
    PrevButton
}                              from "../button";
import {useCalendarStoreState} from "../context";

export interface ICalendarProps {
}

export const Calendar: FC<ICalendarProps> = () => {
    const {calendar: {months}} = useCalendarStoreState(({calendar}) => ({calendar}));
    return <>
        Calendar here!
        <Button>Cudlik</Button>
        <>
            {months.map(({year, month, weeks}) => (
                <div key={`calendar-${year}-${month}`}>
                    <header>
                        <h1>{month} {year}</h1>
                    </header>
                    <nav>
                        <PrevButton/>
                        <NextButton/>
                    </nav>
                    {weeks.map((week) => week.map((day) => <>
                            {day
                                ? <button>{day.date.getDate()}</button>
                                : <span/>}
                        </>
                    ))}
                </div>
            ))}
        </>
    </>;
};
