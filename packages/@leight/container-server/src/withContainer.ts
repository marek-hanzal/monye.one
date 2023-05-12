import {
    $Container,
    type IContainer
} from "@leight/container";
import {
    type ClassValue,
    type FactoryValue,
    type PumpIt
} from "pumpit";

export class Container implements IContainer {
    constructor(
        public container: PumpIt
    ) {
    }

    public bindClass<T extends ClassValue>(key: IContainer.Key, value: T, options?: IContainer.Options.Class<T>): IContainer {
        this.container.unbind(key);
        this.container.bindClass(key, value, options);
        return this;
    }

    public bindFactory<T extends FactoryValue>(key: IContainer.Key, value: T, options?: IContainer.Options.Factory<T>): IContainer {
        this.container.unbind(key);
        this.container.bindFactory(key, value, options);
        return this;
    }

    public bindValue<T>(key: IContainer.Key, value: T): IContainer {
        this.container.unbind(key);
        this.container.bindValue(key, value);
        return this;
    }

    public child(): IContainer {
        return Container.create(this.container.child());
    }

    public resolve<T>(key: IContainer.Key): T {
        return this.container.resolve(key);
    }

    static create(container: PumpIt): IContainer {
        const $container = new Container(container);
        $container.bindValue($Container, $container);
        return $container;
    }
}
