import {type IContainer} from "@leight/container";
import {
    $BankSource,
    $BankSourceMapper,
    $BankSourceService,
    type IBankSource
}                        from "@monye.one/bank";
import {
    BankSource,
    BankSourceMapper,
    BankSourceService,
    type IBankSourceMapper,
    type IBankSourceService
}                        from "./sdk";

export interface IBankContainer {
    BankSource: IBankSource;
    BankSourceMapper: IBankSourceMapper;
    BankSourceService: IBankSourceService;
}

export const BankContainer = (container: IContainer): IBankContainer => {
    container
        .bindClass($BankSource, BankSource)
        .bindClass($BankSourceMapper, BankSourceMapper)
        .bindClass($BankSourceService, BankSourceService);

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
    };
};
