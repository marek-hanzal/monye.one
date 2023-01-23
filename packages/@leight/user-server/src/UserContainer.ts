import "reflect-metadata";
import { container } from "tsyringe";
import { RegistrationService, UserJwtService } from "./service";
import {
    $RegistrationService,
    $UserJwtService,
    type IRegistrationService,
    type IUserJwtService,
} from "@leight/user";

export interface IUserContainer {
    RegistrationService: IRegistrationService;
    UserJwtService: IUserJwtService;
}

export const UserContainer = (target: typeof container): IUserContainer => {
    target.register<IRegistrationService>($RegistrationService, {
        useClass: RegistrationService,
    });
    target.register<IUserJwtService>($UserJwtService, {
        useClass: UserJwtService,
    });

    return {
        get RegistrationService() {
            return target.resolve<IRegistrationService>($RegistrationService);
        },
        get UserJwtService() {
            return target.resolve<IUserJwtService>($UserJwtService);
        },
    };
};
