import { container as coolContainer } from "tsyringe";
import { $TokenService, type ITokenService } from "../api";
import { TokenService } from "./TokenService";

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
