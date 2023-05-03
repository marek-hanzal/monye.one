import {
    type IFilterPrismaSchemaType,
    type IFilterSourceSchemaType
}                               from "@leight/filter";
import {
    $PrismaClient,
    PrismaClient
}                               from "@leight/prisma";
import {
    $UserService,
    type IUserService
}                               from "@leight/user";
import {keywordsOf}             from "@leight/utils";
import {FilterBasePrismaSource} from "../sdk";

export class FilterSource extends FilterBasePrismaSource {
    static inject = [
        $PrismaClient,
        $UserService,
    ];

    constructor(
        prismaClient: PrismaClient,
        protected userService: IUserService,
    ) {
        super(prismaClient);
    }

    toWhere(filter?: IFilterSourceSchemaType["Filter"]): IFilterPrismaSchemaType["Where"] | undefined {
        if (!filter) {
            return;
        }

        const where: IFilterPrismaSchemaType["Where"] = {
            AND:    [],
            userId: this.userService.required(),
        };

        const {fulltext, type, id, ids} = filter;

        if (id !== undefined) {
            return {
                id,
            };
        }

        if (ids) {
            return {
                id: {
                    in: ids,
                },
            };
        }

        const $fulltext = keywordsOf(fulltext);
        if ($fulltext) {
            where["AND"] = Array.isArray(where["AND"]) ? where["AND"].concat([
                {
                    OR: $fulltext?.map(item => ({
                        OR: [
                            {
                                name: {
                                    contains: item,
                                    mode:     "insensitive",
                                },
                            },
                        ]
                    })),
                }
            ]) : [];
        }

        if (type) {
            where["AND"] = Array.isArray(where["AND"]) ? where["AND"].concat([
                {
                    type,
                }
            ]) : [];
        }

        return where;
    }

    toWhereUnique(filter: IFilterSourceSchemaType["Filter"]): IFilterPrismaSchemaType["WhereUnique"] {
        const {id, type_name} = filter;

        if (id) {
            return {
                id,
            };
        }
        if (type_name) {
            return {
                userId_type_name: {
                    userId: this.userService.required(),
                    ...type_name,
                },
            };
        }
        return {};
    }
}
