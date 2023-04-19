import {
    ITokenService,
    TokenError
} from "@leight/user";
import {
    diffOf,
    intersectOf
} from "@leight/utils";

export class TokenService implements ITokenService {
    constructor(public tokens: string[]) {
    }

    checkAny(tokens?: string[]): void {
        if (!this.hasAny(tokens)) {
            throw new TokenError(
                "Missing required tokens.",
                this.tokens,
                tokens
            );
        }
    }

    checkTokens(tokens?: string[]): void {
        if (!this.hasTokens(tokens)) {
            throw new TokenError(
                "Missing required tokens.",
                this.tokens,
                tokens
            );
        }
    }

    hasAny(tokens?: string[]): boolean {
        return tokens && tokens.length > 0
            ? intersectOf(this.tokens, tokens).length > 0
            : true;
    }

    hasTokens(tokens?: string[]): boolean {
        return tokens && tokens.length > 0
            ? diffOf(tokens, this.tokens).length === tokens.length
            : true;
    }
}
