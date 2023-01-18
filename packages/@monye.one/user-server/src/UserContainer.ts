import {container} from "tsyringe";
import {
    $RegistrationService,
    $UserJwtService,
    type IRegistrationService,
    type IUserJwtService
}                  from "./api";
import {
    RegistrationService,
    UserJwtService
}                  from "./service";

export const UserContainer = (target: typeof container) => {
    target.register<IRegistrationService>($RegistrationService, {
        useClass: RegistrationService,
    });
    target.register<IUserJwtService>($UserJwtService, {
        useClass: UserJwtService,
    });

    return {
        get RegistrationService() {
            return target.resolve<RegistrationService>($RegistrationService);
        },
        get UserJwtService() {
            return target.resolve<UserJwtService>($UserJwtService);
        },
    };
};
