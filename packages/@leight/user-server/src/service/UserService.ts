import "reflect-metadata";
import { $UserId, IUserService, UserError } from "@leight/user";
import { inject, injectable } from "tsyringe";

@injectable()
export class UserService implements IUserService {
    constructor(@inject($UserId) public $userId?: string) {}

    optional(): string | undefined {
        return this.$userId;
    }

    required(): string {
        if (!this.$userId) {
            throw new UserError(
                `There is not userId. Set userId into a container with $UserId (${$UserId.toString()}) symbol.`
            );
        }
        return this.$userId;
    }
}
