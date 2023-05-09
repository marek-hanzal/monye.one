import {type IUserSourceEx, type UserSource} from "@leight/user";
import {BaseUserRepositoryEx} from "../sdk";

export class UserRepository extends BaseUserRepositoryEx implements IUserSourceEx {
    public findByEmail(email: string): Promise<UserSource["Type"]["Entity"]> {
        return this.prisma().findUniqueOrThrow({where: {email}});
    }
}
