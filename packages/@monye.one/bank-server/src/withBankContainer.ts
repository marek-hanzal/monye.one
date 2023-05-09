import {type IContainer} from "@leight/container";
import {$BankRepository, $BankRepositoryMapper, $BankStatsService} from "@monye.one/bank";
import {BankRepositoryMapper} from "./mapper";
import {BankRepository} from "./repository";
import {withBankRepositoryContainer} from "./sdk";
import {BankStatsService} from "./service";

export const withBankContainer = (container: IContainer) => {
    withBankRepositoryContainer(container);
    container
        .bindClass($BankRepository, BankRepository)
        .bindClass($BankRepositoryMapper, BankRepositoryMapper)
        .bindClass($BankStatsService, BankStatsService);
};
