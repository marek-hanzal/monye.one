import {router}                        from "../../../router";
import {CalendarEventRepositoryRouter} from "../../../sdk";

export const EventRouter = router({
    repository: CalendarEventRepositoryRouter,
});
