import {
    type IContainer,
    ServiceContext
}                    from "@leight/container";
import {type IToken} from "./IToken";

export interface IUserJwtService {
    token<T extends IToken>(props: T): Promise<T>;

    defaults(): string[];
}

export const $UserJwtService = Symbol.for("@leight/user/UserJwtService");
export const withUserJwtService = (container: IContainer) => new ServiceContext<IUserJwtService>(container, $UserJwtService).resolve();
