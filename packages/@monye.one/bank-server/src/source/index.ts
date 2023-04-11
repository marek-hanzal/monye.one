import {
    $PrismaClient,
    PrismaClient
}                             from "@leight/prisma";
import {
    $UserService,
    type IUserService
}                             from "@leight/user";
import {
    type IBankSourceSchema,
    type IBankWhere
}                             from "@monye.one/bank";
import {BankBasePrismaSource} from "../sdk/ServerPrismaSource";

export class BankSourceEx extends BankBasePrismaSource {
    static inject = [
        $UserService,
        $PrismaClient,
    ];

    constructor(
        protected userService: IUserService,
        protected prismaClient: PrismaClient,
    ) {
        super(prismaClient);
    }

    toWhere(filter?: IBankSourceSchema["Filter"]): IBankWhere | undefined {
        if (!filter) {
            return;
        }
        return {
            ...filter,
            userId: this.userService.required(),
        };
    }
}
