import {
    type IContainer,
    ServiceContext
} from "@leight/container";
import {
    $BankSource,
    type IBankSource
} from "@monye.one/bank";

export const BankSourceContext = (container: IContainer) => new ServiceContext<IBankSource>(container, $BankSource);
