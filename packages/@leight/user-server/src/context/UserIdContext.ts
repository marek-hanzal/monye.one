import { container as coolContainer } from "tsyringe";
import { $UserId } from "@leight/user";

export class $UserIdContext {
    constructor(private container: typeof coolContainer) {}

    register(userId?: string): this {
        this.container.register<string | undefined>($UserId, {
            useValue: userId,
        });
        return this;
    }

    resolve(): string | undefined {
        return this.container.resolve<string | undefined>($UserId);
    }
}

/**
 * Creates a wrapper for user id used in UserService.
 */
export const UserIdContext = (container: typeof coolContainer) => {
    return new $UserIdContext(container);
};
