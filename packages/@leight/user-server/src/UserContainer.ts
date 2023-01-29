import "reflect-metadata";
import {
    $RegistrationService,
    $UserJwtService,
    $UserService,
    type IRegistrationService,
    type IUserJwtService,
    type IUserService,
} from "@leight/user";
import {type IContainer} from "@leight/container";
import {RegistrationService, UserJwtService, UserService} from "./service";

export interface IUserContainer {
    RegistrationService: IRegistrationService;
    UserJwtService: IUserJwtService;
    UserService: IUserService;
}

export const UserContainer = (container: IContainer): IUserContainer => {
    container.register<IRegistrationService>($RegistrationService, {
        useClass: RegistrationService,
    });
    container.register<IUserJwtService>($UserJwtService, {
        useClass: UserJwtService,
    });
    container.register<IUserService>($UserService, {
        useClass: UserService,
    });

    return {
        get RegistrationService() {
            return container.resolve<IRegistrationService>($RegistrationService);
        },
        get UserJwtService() {
            return container.resolve<IUserJwtService>($UserJwtService);
        },
        get UserService() {
            return container.resolve<IUserService>($UserService);
        },
    };
};
