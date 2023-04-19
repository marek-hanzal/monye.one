/**
 * Wrapper around a user.
 */
export interface IUserService {
    /**
     * Direct access to user id.
     */
    readonly $userId?: string;

    /**
     * Requires an user id.
     */
    required(): string;

    /**
     * Requests optional user id.
     */
    optional(): string | undefined;
}

/**
 * Token for user service.
 */
export const $UserService = Symbol.for("@leight/user/UserService");
/**
 * Token for just for user id; container should return just a string.
 */
export const $UserId      = Symbol.for("@leight/user/UserId");
