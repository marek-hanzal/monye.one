import {router} from "../router";
import {JobSourceRouter} from "../sdk/ServerTrpc/JobTrpcRouter";

export const JobRouter = router({
    source: JobSourceRouter,
});
