import {
    $PrismaClient,
    PrismaClient
}                             from "@leight/prisma";
import {
    $UserService,
    type IUserService
}                             from "@leight/user";
import {keywordsOf}           from "@leight/utils";
import {
    type IBankPrismaSchemaType,
    type IBankSourceSchemaType
}                             from "@monye.one/bank";
import {BankBasePrismaSource} from "../sdk/Source/BankBasePrismaSource";

export class BankSource extends BankBasePrismaSource {
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

        const where: IBankPrismaSchemaType["Where"] = {
            AND:    [],
            userId: this.userService.required(),
        };

        const {fulltext} = filter;
        const $fulltext  = keywordsOf(fulltext);
        if ($fulltext) {
            where["AND"] = Array.isArray(where["AND"]) ? where["AND"].concat([
                {
                    OR: $fulltext?.map(item => ({
                        OR: [
                            {
                                account: {
                                    contains: item,
                                    mode:     "insensitive",
                                }
                            },
                            {
                                description: {
                                    contains: item,
                                    mode:     "insensitive",
                                }
                            },
                        ]
                    })),
                }
            ]) : [];
        }

        return where;
    }

    toWhereUnique(filter: IBankSourceSchemaType["Filter"]): IBankPrismaSchemaType["WhereUnique"] {
        const {userId_account, id} = filter;
        return {
            id,
            userId_account,
        };
    }
}
