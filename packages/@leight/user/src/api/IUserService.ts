import {
    type IContainer,
    ServiceContext
} from "@leight/container";

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
export const withUserService = (container: IContainer) => new ServiceContext<IUserService>(container, $UserService).resolve();

/**
 * Token for just for user id; container should return just a string.
 */
export const $UserId = Symbol.for("@leight/user/UserId");
export const withUserId = (container: IContainer) => new ServiceContext<string | undefined>(container, $UserId).resolve();
