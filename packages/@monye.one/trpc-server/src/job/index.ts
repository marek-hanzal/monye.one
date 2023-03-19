import {router}       from "../router";
import {SourceRouter} from "./source";

export const JobRouter = router({
    source: SourceRouter,
});
