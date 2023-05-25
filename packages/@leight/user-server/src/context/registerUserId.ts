import {type IContainer} from "@leight/container";
import {$UserId}         from "@leight/user";

/**
 * Creates a wrapper for user id used in UserService.
 */
export const registerUserId = (container: IContainer, userId?: string) => {
    container.bindValue($UserId, userId);
    return container;
};
