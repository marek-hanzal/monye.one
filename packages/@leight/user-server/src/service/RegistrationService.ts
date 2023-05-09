import {$UserRepository, type IRegistrationService, type IToken, type IUserRepository} from "@leight/user";

/**
 * Service used to register new users with en eventual case where the
 * very first user gets a "root" role (token).
 */
export class RegistrationService implements IRegistrationService {
    static inject = [
        $UserRepository,
    ];

    constructor(
        protected userRepository: IUserRepository,
    ) {
    }

    public async handle<T extends IToken>(
        {
            token,
            isNewUser,
        }: IRegistrationService.HandleProps<T>): Promise<void> {
        if (!isNewUser || !token.sub) {
            return;
        }
        if ((await this.userRepository.count()) === 1) {
            await this.registerRootUser({token, isNewUser});
            return;
        }
        await this.registerCommonUser({token, isNewUser});
    }

    /**
     * Define defaults for the new root user (tokens and co.).
     */
    private async registerRootUser<T extends IToken>(
        {
            token: {sub},
        }: IRegistrationService.HandleProps<T>): Promise<void> {
        if (!sub) {
            return;
        }
        const user = await this.userRepository.get(sub);
        user.id = "user.id";
    }

    /**
     * Define defaults for the new common user (tokens and co.).
     */
    private async registerCommonUser<T extends IToken>(
        {
            token: {sub},
        }: IRegistrationService.HandleProps<T>): Promise<void> {
        if (!sub) {
            return;
        }
        const user = await this.userRepository.get(sub);
        user.id = "user.id";
    }
}
