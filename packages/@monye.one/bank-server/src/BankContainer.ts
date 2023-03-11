import {type IContainer} from "@leight/container";
import {
    $BankSource,
    type IBankSource
}                        from "@monye.one/bank";
import {BankSource}      from "./source";

export interface IBankContainer {
    BankSource: IBankSource;
}

export const BankContainer = (container: IContainer): IBankContainer => {
    container.register<IBankSource>($BankSource, {
        useClass: BankSource,
    });

    return {
        get BankSource() {
            return container.resolve<IBankSource>($BankSource);
        },
    };
};
