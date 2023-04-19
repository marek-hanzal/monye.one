import {
    type IContainer,
    ServiceContext
}                from "@leight/container";
import {$UserId} from "@leight/user";

export class $UserIdContext extends ServiceContext<string | undefined> {
    constructor(container: IContainer) {
        super(container, $UserId);
    }

    register(userId?: string): this {
        this.bindValue(userId);
        return this;
    }
}

/**
 * Creates a wrapper for user id used in UserService.
 */
export const UserIdContext = (container: IContainer) => new $UserIdContext(container);
