import {$PrismaClient}   from "@leight/prisma";
import {type IToken}     from "@monye.one/user";
import {PrismaClient}    from "@prisma/client";
import {
    inject,
    injectable
}                        from "tsyringe";
import {IUserJwtService} from "../api";

/**
 * Service used to prepare user's JWT token.
 */
@injectable()
export class UserJwtService implements IUserJwtService {
    constructor(@inject($PrismaClient) protected prisma: PrismaClient) {
    }

    public async token<T extends IToken>(props: T): Promise<T> {
        return props;
    }
}
