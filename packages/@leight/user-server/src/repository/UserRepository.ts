import {
    type IUserSourceEx,
    type IUserSourceType
}                             from "@leight/user";
import {BaseUserRepositoryEx} from "../sdk";

export class UserRepository extends BaseUserRepositoryEx implements IUserSourceEx {
    public findByEmail(email: string): Promise<IUserSourceType["Entity"]> {
        return this.prisma().findUniqueOrThrow({where: {email}});
    }
}
