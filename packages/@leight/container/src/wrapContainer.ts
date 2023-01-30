import {type IContainer} from "./IContainer";
import {$Container} from "./Container";

export const wrapContainer = (container: IContainer) => {
    container.register<IContainer>($Container, {
        useValue: container,
    });
}
