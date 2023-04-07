import {ICalendarEventSourceSchema} from "@monye.one/book";
import {CalendarEventBaseSource}    from "../sdk";

export class CalendarEventBaseSourceEx extends CalendarEventBaseSource {
    async runCount(query: ICalendarEventSourceSchema["Query"]): Promise<number> {
        return 0;
    }

    async runQuery(query: ICalendarEventSourceSchema ["Query"]): Promise<ICalendarEventSourceSchema["Entity"][]> {
        return [];
    }
}
