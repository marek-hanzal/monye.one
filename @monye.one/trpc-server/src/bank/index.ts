import {BankStatsParamsSchema} from "@monye.one/bank";
import {BankStatsProcedure}    from "@monye.one/bank-server";
import {
    procedure,
    router
}                              from "../router";
import {BankRepositoryRouter}  from "../sdk";

export const BankRouter = router({
    repository: BankRepositoryRouter,
    stats:  procedure.input(BankStatsParamsSchema).mutation(BankStatsProcedure),
});
