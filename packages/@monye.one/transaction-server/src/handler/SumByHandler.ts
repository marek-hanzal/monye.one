import {withHandler} from "@leight/trpc-server";
import {$TransactionRepository, type ITransactionSumBy, type TransactionSource} from "@monye.one/transaction";
import {TransactionRepository} from "../repository";

export const SumByHandler = withHandler<TransactionSource["Type"]["Filter"] | undefined, ITransactionSumBy>({
    handler: ({request, container}) => container.resolve<TransactionRepository>($TransactionRepository).sumBy(request),
});
