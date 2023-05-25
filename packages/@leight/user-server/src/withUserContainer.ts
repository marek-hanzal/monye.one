import {type IContainer}             from "@leight/container";
import {
    $RegistrationService,
    $UserJwtService,
    $UserRepository,
    $UserService
}                                    from "@leight/user";
import {UserRepository}              from "./repository";
import {withUserRepositoryContainer} from "./sdk";
import {
    RegistrationService,
    UserJwtService,
    UserService
}                                    from "./service";

export const withUserContainer = (container: IContainer) => {
    withUserRepositoryContainer(container);
    container
        .bindClass($RegistrationService, RegistrationService)
        .bindClass($UserJwtService, UserJwtService)
        .bindClass($UserService, UserService)
        .bindClass($UserRepository, UserRepository);
};
