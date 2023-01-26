import "reflect-metadata";
import { container } from "tsyringe";
import {
    $RegistrationService,
    $UserJwtService,
    $UserService,
    type IRegistrationService,
    type IUserJwtService,
    type IUserService,
} from "@leight/user";
import { RegistrationService, UserJwtService, UserService } from "./service";

export interface IUserContainer {
    RegistrationService: IRegistrationService;
    UserJwtService: IUserJwtService;
    UserService: IUserService;
}

export const UserContainer = (target: typeof container): IUserContainer => {
    target.register<IRegistrationService>($RegistrationService, {
        useClass: RegistrationService,
    });
    target.register<IUserJwtService>($UserJwtService, {
        useClass: UserJwtService,
    });
    target.register<IUserService>($UserService, {
        useClass: UserService,
    });

    return {
        get RegistrationService() {
            return target.resolve<IRegistrationService>($RegistrationService);
        },
        get UserJwtService() {
            return target.resolve<IUserJwtService>($UserJwtService);
        },
        get UserService() {
            return target.resolve<IUserService>($UserService);
        },
    };
};
