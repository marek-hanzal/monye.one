import {type IContainer}  from "@leight/container";
import {
    $BankSource,
    $BankSourceMapper,
    $BankSourceService,
    $BankStatsService,
    type IBankSource,
    type IBankSourceMapper,
    type IBankStatsService
}                         from "@monye.one/bank";
import {BankSourceMapper} from "./mapper";
import {
    BankBaseSourceService,
    type IBankSourceService
}                         from "./sdk";
import {BankStatsService} from "./service";
import {BankSource}       from "./source";

export interface IBankContainer {
    BankSource: IBankSource;
    BankSourceMapper: IBankSourceMapper;
    BankSourceService: IBankSourceService;
    BankStatsService: IBankStatsService;
}

export const BankContainer = (container: IContainer): IBankContainer => {
    container
        .bindClass($BankSource, BankSource)
        .bindClass($BankSourceMapper, BankSourceMapper)
        .bindClass($BankSourceService, BankBaseSourceService)
        .bindClass($BankStatsService, BankStatsService);

    return {
        get BankSource() {
            return container.resolve<IBankSource>($BankSource);
        },
        get BankSourceMapper() {
            return container.resolve<IBankSourceMapper>($BankSourceMapper);
        },
        get BankSourceService() {
            return container.resolve<IBankSourceService>($BankSourceService);
        },
        get BankStatsService() {
            return container.resolve<IBankStatsService>($BankStatsService);
        },
    };
};
