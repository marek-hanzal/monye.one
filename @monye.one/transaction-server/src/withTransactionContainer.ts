import {type IContainer} from "@leight/container";
import {$TransactionImportHandler, $TransactionKeywordRepository, $TransactionKeywordService, $TransactionPairService, $TransactionRepository} from "@monye.one/transaction";
import {TransactionKeywordRepository, TransactionRepository} from "./repository";
import {withTransactionKeywordRepositoryContainer, withTransactionRepositoryContainer} from "./sdk";
import {TransactionImportHandler, TransactionKeywordService, TransactionPairService} from "./service";

export const withTransactionContainer = (container: IContainer) => {
    withTransactionRepositoryContainer(container);
    withTransactionKeywordRepositoryContainer(container);
    container
        .bindClass($TransactionImportHandler, TransactionImportHandler)
        .bindClass($TransactionRepository, TransactionRepository)
        .bindClass($TransactionKeywordRepository, TransactionKeywordRepository)
        .bindClass($TransactionKeywordService, TransactionKeywordService)
        .bindClass($TransactionPairService, TransactionPairService);
};
