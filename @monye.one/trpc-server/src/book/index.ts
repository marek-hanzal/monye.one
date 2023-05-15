import {router}         from "../router";
import {CalendarRouter} from "./calendar";

export const BookRouter = router({
    calendar: CalendarRouter,
});
