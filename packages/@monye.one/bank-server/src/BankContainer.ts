import {type IContainer} from "@leight/container";
import {
    $BankSource,
    type IBankSource
}                        from "@monye.one/bank";
import {BankSource}      from "./sdk";

export interface IBankContainer {
    BankSource: IBankSource;
}

export const BankContainer = (container: IContainer): IBankContainer => {
    container.bindClass($BankSource, BankSource);

    return {
        get BankSource() {
            return container.resolve<IBankSource>($BankSource);
        },
    };
};
