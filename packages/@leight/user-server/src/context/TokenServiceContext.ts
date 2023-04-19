import {
    type IContainer,
    ServiceContext
}                     from "@leight/container";
import {
    $TokenService,
    type ITokenService
}                     from "@leight/user";
import {TokenService} from "../service";

export class $TokenServiceContext extends ServiceContext<ITokenService> {
    constructor(container: IContainer) {
        super(container, $TokenService);
    }

    register(tokens?: string[]): this {
        this.bindValue(new TokenService(tokens || []));
        return this;
    }
}

export const TokenServiceContext = (container: IContainer) => new $TokenServiceContext(container);
