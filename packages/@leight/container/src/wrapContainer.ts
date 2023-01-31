import {type IContainer} from "./IContainer";
import {$Container} from "./Container";

export const wrapContainer = (container: IContainer): IContainer => {
    container.register<IContainer>($Container, {
        useValue: container,
    });
    return container;
}
