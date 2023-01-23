import {$PrismaClient} from "@leight/prisma";
import {PrismaClient} from "@prisma/client";
import {inject, injectable} from "tsyringe";
import {type IRegistrationService, type IToken} from "@leight/user";

/**
 * Service used to register new users with en eventual case where the
 * very first user gets a "root" role (token).
 */
@injectable()
export class RegistrationService implements IRegistrationService {
    constructor(@inject($PrismaClient) protected prisma: PrismaClient) {}

    public async handle<T extends IToken>({
        token,
        isNewUser,
    }: IRegistrationService.HandleProps<T>): Promise<void> {
        if (!isNewUser || !token.sub) {
            return;
        }
        if ((await this.prisma.user.count()) === 1) {
            await this.registerRootUser({ token, isNewUser });
            return;
        }
        await this.registerCommonUser({ token, isNewUser });
    }

    /**
     * Define defaults for the new root user (tokens and co.).
     */
    private async registerRootUser<T extends IToken>({
        token: { sub },
    }: IRegistrationService.HandleProps<T>): Promise<void> {
        const user = await this.prisma.user.findUniqueOrThrow({
            where: { id: sub },
        });
        user.id = "user.id";
    }

    /**
     * Define defaults for the new common user (tokens and co.).
     */
    private async registerCommonUser<T extends IToken>({
        token: { sub },
    }: IRegistrationService.HandleProps<T>): Promise<void> {
        const user = await this.prisma.user.findUniqueOrThrow({
            where: { id: sub },
        });
        user.id = "user.id";
    }
}
