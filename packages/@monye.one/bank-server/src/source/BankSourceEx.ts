import {
    $PrismaClient,
    PrismaClient
}                             from "@leight/prisma";
import {
    $UserService,
    type IUserService
}                             from "@leight/user";
import {
    type IBankPrismaSchemaType,
    type IBankSourceSchemaType
}                             from "@monye.one/bank";
import {BankBasePrismaSource} from "../sdk/Source/BankBasePrismaSource";

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

    toWhere(filter?: IBankSourceSchemaType["Filter"]): IBankPrismaSchemaType["Where"] | undefined {
        if (!filter) {
            return;
        }
        return {
            ...filter,
            userId: this.userService.required(),
        };
    }

    toWhereUnique(filter: IBankSourceSchemaType["Filter"]): IBankPrismaSchemaType["WhereUnique"] {
        return {
            userId_account: filter.userId_account,
        };
    }
}
