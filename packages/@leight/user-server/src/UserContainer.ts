import {type IContainer} from "@leight/container";
import {
    $RegistrationService,
    $UserJwtService,
    $UserService,
    $UserSource,
    $UserSourceMapper,
    $UserSourceService,
    type IRegistrationService,
    type IUserJwtService,
    type IUserService,
    type IUserSource,
    type IUserSourceMapper,
}                        from "@leight/user";
import {
    type IUserSourceService,
    UserSource,
    UserSourceMapper,
    UserSourceService
}                        from "./sdk";
import {
    RegistrationService,
    UserJwtService,
    UserService
}                        from "./service";

export interface IUserContainer {
    RegistrationService: IRegistrationService;
    UserJwtService: IUserJwtService;
    UserService: IUserService;
    UserSource: IUserSource;
    UserSourceService: IUserSourceService;
    UserSourceMapper: IUserSourceMapper;
}

export const UserContainer = (container: IContainer): IUserContainer => {
    container
        .bindClass($RegistrationService, RegistrationService)
        .bindClass($UserJwtService, UserJwtService)
        .bindClass($UserService, UserService)
        .bindClass($UserSource, UserSource)
        .bindClass($UserSourceService, UserSourceService)
        .bindClass($UserSourceMapper, UserSourceMapper);

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
        get UserSource() {
            return container.resolve<IUserSource>($UserSource);
        },
        get UserSourceService() {
            return container.resolve<IUserSourceService>($UserSourceService);
        },
        get UserSourceMapper() {
            return container.resolve<IUserSourceMapper>($UserSourceMapper);
        },
    };
};
