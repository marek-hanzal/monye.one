import {type IContainer} from "@leight/container";
import {
    $BankSource,
    $BankSourceMapper,
    type IBankSource
}                        from "@monye.one/bank";
import {
    BankSource,
    BankSourceMapper,
    type IBankSourceMapper
}                        from "./sdk";

export interface IBankContainer {
    BankSource: IBankSource;
    BankSourceMapper: IBankSourceMapper;
}

export const BankContainer = (container: IContainer): IBankContainer => {
    container
        .bindClass($BankSource, BankSource)
        .bindClass($BankSourceMapper, BankSourceMapper);

    return {
        get BankSource() {
            return container.resolve<IBankSource>($BankSource);
        },
        get BankSourceMapper() {
            return container.resolve<IBankSourceMapper>($BankSourceMapper);
        },
    };
};
