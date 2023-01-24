import { type IToken } from "./IToken";

export interface IUserJwtService {
    token<T extends IToken>(props: T): Promise<T>;

    defaults(): string[];
}

export const $UserJwtService = Symbol.for("@leight/user/UserJwtService");
