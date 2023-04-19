import {router} from "../../../router";
import {CalendarEventSourceRouter} from "../../../sdk/ServerTrpc/CalendarEventTrpcRouter";

export const EventRouter = router({
    source: CalendarEventSourceRouter,
});
