import { container as coolContainer } from "tsyringe";
import { $UserService, type IUserService } from "@leight/user";

export class $UserServiceContext {
    constructor(private container: typeof coolContainer) {}

    resolve(): IUserService {
        return this.container.resolve<IUserService>($UserService);
    }
}

/**
 * Wrapper for accessing typed UserService from any container.
 */
export const UserServiceContext = (container: typeof coolContainer) => {
    return new $UserServiceContext(container);
};
