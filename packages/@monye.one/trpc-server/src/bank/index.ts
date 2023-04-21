import {BankStatsParamsSchema} from "@monye.one/bank";
import {BankStatsProcedure}    from "@monye.one/bank-server";
import {
    procedure,
    router
}                              from "../router";
import {BankSourceRouter}      from "../sdk";

export const BankRouter = router({
    source: BankSourceRouter,
    stats:  procedure.input(BankStatsParamsSchema).mutation(BankStatsProcedure),
});
