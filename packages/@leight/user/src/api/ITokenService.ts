import { container } from "tsyringe";
import { TokenService } from "../service";

export interface ITokenService {
    readonly tokens: string[];

    /**
     * Passes if user has any of the specified tokens.
     */
    hasAny(tokens?: string[]): boolean;

    /**
     * Passes if user has any of the specified tokens; otherwise an exception is thrown.
     */
    checkAny(tokens?: string[]): void;

    /**
     * Passes if user has all specified tokens.
     */
    hasTokens(tokens?: string[]): boolean;

    /**
     * Passes if user has all specified tokens.
     */
    checkTokens(tokens?: string[]): void;
}

export namespace TokenServiceUtils {
    export const resolve = (target: typeof container): ITokenService => {
        return target.resolve<ITokenService>($TokenService);
    };

    export const withTokens = (target: typeof container, tokens: string[]) => {
        const container = target.createChildContainer();
        container.register<ITokenService>($TokenService, {
            useValue: new TokenService(tokens),
        });
        return container;
    };
}

export const $TokenService = Symbol.for("@leight/user/TokenService");
