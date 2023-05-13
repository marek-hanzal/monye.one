import {
    type AvailableScopes,
    type BindKey,
    type ClassOptions,
    type ClassValue,
    type FactoryOptions,
    type FactoryValue,
    SCOPE
} from "pumpit";

export interface IContainer {
    unbind(key: IContainer.Key): void;

    bindClass<T extends ClassValue>(key: IContainer.Key, value: T, options?: IContainer.Options.Class<T>): IContainer;

    bindFactory<T extends FactoryValue>(key: IContainer.Key, value: T, options?: IContainer.Options.Factory<T>): IContainer;

    bindValue<T>(key: IContainer.Key, value: T): IContainer;

    resolve<T>(key: IContainer.Key): T;

    child(): IContainer;
}

export namespace IContainer {
    export type Key = BindKey;
    export const Scope = SCOPE;

    export namespace Options {
        export type Class<T extends ClassValue> = Omit<Partial<ClassOptions<T, AvailableScopes>>, "type">;
        export type Factory<T extends FactoryValue> = Omit<Partial<FactoryOptions<T, AvailableScopes>>, "type">;
    }
}

export const $Container = Symbol.for("@leight/container/IContainer");
