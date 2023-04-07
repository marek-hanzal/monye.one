import {DateTime}                        from "@leight/i18n";
import {type ICalendarEventSourceSchema} from "@monye.one/book";
import {CalendarEventBaseSource}         from "../sdk";

export class CalendarEventBaseSourceEx extends CalendarEventBaseSource {
    async runCount(query: ICalendarEventSourceSchema["Query"]): Promise<number> {
        return 0;
    }

    async runQuery(query: ICalendarEventSourceSchema ["Query"]): Promise<ICalendarEventSourceSchema["Entity"][]> {
        return [
            {
                date: DateTime.now(),
                id:   "12345",
            },
            {
                date: DateTime.now(),
                id:   "123456",
            },
            {
                date: DateTime.now(),
                id:   "123457",
            },
            {
                date: DateTime.now().minus({day: 2}),
                id:   "123453",
            },
            {
                date: DateTime.now().plus({day: 4}),
                id:   "123459",
            },
        ];
    }
}
