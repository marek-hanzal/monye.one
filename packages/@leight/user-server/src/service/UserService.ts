import {
    $UserId,
    IUserService,
    UserError
} from "@leight/user";

export class UserService implements IUserService {
    static inject = [
        $UserId,
    ];

    constructor(public $userId?: string) {
    }

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
