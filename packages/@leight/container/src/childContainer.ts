import {type IContainer} from "./IContainer";
import {wrapContainer} from "./wrapContainer";

export const childContainer = (container: IContainer): IContainer => {
    return wrapContainer(container.createChildContainer());
}
