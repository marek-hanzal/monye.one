import {
    type IToken,
    type IUserJwtService
} from "@leight/user";

/**
 * Service used to prepare user's JWT token.
 */
export class UserJwtService implements IUserJwtService {
    public async token<T extends IToken>(props: T): Promise<T> {
        return {
            ...props,
            tokens: this.defaults(),
        };
    }

    public defaults(): string[] {
        return ["user"];
    }
}
