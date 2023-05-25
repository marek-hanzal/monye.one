import {
    type IUserRepositoryEx,
    type IUserSourceType
}                             from "@leight/user";
import {BaseUserRepositoryEx} from "../sdk";

export class UserRepository extends BaseUserRepositoryEx implements IUserRepositoryEx {
    public findByEmail(email: string): Promise<IUserSourceType["Entity"]> {
        return this.prisma().findUniqueOrThrow({where: {email}});
    }
}
