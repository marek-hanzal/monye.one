import {type IContainer} from "@leight/container";
import {$TokenService}   from "@leight/user";
import {TokenService}    from "../service";

export const registerTokenService = (container: IContainer, tokens?: string[]) => {
    container.bindValue($TokenService, new TokenService(tokens || []));
    return container;
};
