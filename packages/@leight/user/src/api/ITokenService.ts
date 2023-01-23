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

export const $TokenService = Symbol.for("@leight/user/TokenService");
