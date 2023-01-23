import {$PrismaClient} from "@leight/prisma";
import {PrismaClient} from "@prisma/client";
import {inject, injectable} from "tsyringe";
import {type IToken, type IUserJwtService} from "@leight/user";

/**
 * Service used to prepare user's JWT token.
 */
@injectable()
export class UserJwtService implements IUserJwtService {
    constructor(@inject($PrismaClient) protected prisma: PrismaClient) {}

    public async token<T extends IToken>(props: T): Promise<T> {
        return {
            ...props,
            tokens: ["token1", "token2", "*"],
        };
    }
}
