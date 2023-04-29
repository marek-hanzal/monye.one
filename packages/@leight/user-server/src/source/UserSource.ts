import {
    type IUserSourceEx,
    type IUserSourceSchemaType
}                             from "@leight/user";
import {UserBasePrismaSource} from "../sdk";

export class UserSource extends UserBasePrismaSource implements IUserSourceEx {
    public findByEmail(email: string): Promise<IUserSourceSchemaType["Entity"]> {
        return this.prisma().findUniqueOrThrow({where: {email}});
    }
}
