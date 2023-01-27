import { container } from "tsyringe";
import { type ITokenService, type IUserService } from "@leight/user";

export interface IContext {
    container: typeof container;
    userService: IUserService;
    tokenService: ITokenService;

    /**
     * Shortcut to tokenService for checking user's tokens (connected to checkAny())
     */
    checkAny(tokens?: string[]): void;
}
