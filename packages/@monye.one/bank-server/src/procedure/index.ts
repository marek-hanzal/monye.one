import {withHandler}            from "@leight/trpc-server";
import {type IBankSourceSchema} from "@monye.one/bank";
import {BankSourceContext}      from "../context";

export const BankQueryProcedure = withHandler<void, IBankSourceSchema["Entity"][]>({
    handler: async ({container}) => BankSourceContext(container).resolve().query(),
});
