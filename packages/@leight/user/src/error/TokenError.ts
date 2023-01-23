export class TokenError extends Error {
    constructor(
        message: string,
        public tokens?: string[],
        public requested?: string[]
    ) {
        super(message);
    }
}
