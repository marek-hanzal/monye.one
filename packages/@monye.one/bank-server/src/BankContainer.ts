import {type IContainer}             from "@leight/container";
import {
    $BankSourceMapper,
    $BankStatsService
}                                    from "@monye.one/bank";
import {BankRepositoryMapper}        from "./mapper";
import {withBankRepositoryContainer} from "./sdk";
import {BankStatsService}            from "./service";

export const BankContainer = (container: IContainer) => {
    withBankRepositoryContainer(container);
    container
        .bindClass($BankRepository, BankSource)
        .bindClass($BankSourceMapper, BankRepositoryMapper)
        .bindClass($BankStatsService, BankStatsService);
};
