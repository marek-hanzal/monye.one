import { container as coolContainer } from "tsyringe";
import { $TokenService, type ITokenService } from "@leight/user";
import { TokenService } from "../service";

export class $TokenServiceContext {
    constructor(private container: typeof coolContainer) {}

    register(tokens: string[]): this {
        this.container.register<ITokenService>($TokenService, {
            useValue: new TokenService(tokens),
        });
        return this;
    }

    resolve(): ITokenService {
        return this.container.resolve<ITokenService>($TokenService);
    }
}

export const TokenServiceContext = (container: typeof coolContainer) => {
    return new $TokenServiceContext(container);
};
