import {
    type BindKey,
    type ClassValue
}                        from "pumpit";
import {type IContainer} from "./IContainer";

/**
 * Helper class for mounting container, symbol to a type.
 */
export class ServiceContext<T> {
    constructor(protected container: IContainer, private symbol: BindKey) {
    }

    resolve(): T {
        return this.container.resolve<T>(this.symbol);
    }

    protected bindValue<T>(value: T) {
        this.container.bindValue(this.symbol, value);
    }

    protected bindClass<T extends ClassValue>(value: T) {
        this.container.bindClass(this.symbol, value);
    }
}
