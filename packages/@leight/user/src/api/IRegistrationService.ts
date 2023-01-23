import { IToken } from "./IToken";

export interface IRegistrationService {
    handle<T extends IToken>(
        props: IRegistrationService.HandleProps<T>
    ): Promise<void>;
}

export namespace IRegistrationService {
    export interface HandleProps<T extends IToken> {
        token: T;
        isNewUser?: boolean;
    }
}

export const $RegistrationService = Symbol.for(
    "@leight/user/RegistrationService"
);
