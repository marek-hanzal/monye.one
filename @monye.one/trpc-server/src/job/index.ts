import {router}              from "../router";
import {JobRepositoryRouter} from "../sdk";

export const JobRouter = router({
    repository: JobRepositoryRouter,
});
