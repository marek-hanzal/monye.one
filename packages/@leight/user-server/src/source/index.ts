import {
    type IUserSourceEx,
    type IUserSourceSchema
}                             from "@leight/user";
import {UserBasePrismaSource} from "../sdk";

export class UserSourceEx extends UserBasePrismaSource implements IUserSourceEx {
    public findByEmail(email: string): Promise<IUserSourceSchema["Entity"]> {
        return this.prisma().findUniqueOrThrow({where: {email}});
    }
}
