import {$Container}      from "./Container";
import {type IContainer} from "./IContainer";

export const wrapContainer = (container: IContainer): IContainer => {
    return container.bindValue<IContainer>($Container, container);
};
