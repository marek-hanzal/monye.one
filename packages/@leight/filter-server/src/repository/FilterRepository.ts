import {
    type FilterSource,
    type IFilterRepositorySchemaEx
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
import {BaseFilterRepositoryEx} from "../sdk";

export class FilterRepository extends BaseFilterRepositoryEx {
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

    toWhere(filter?: FilterSource["Type"]["Repository"]["Filter"]): IFilterRepositorySchemaEx["Type"]["Where"] | undefined {
        if (!filter) {
            return;
        }

        const where: IFilterRepositorySchemaEx["Type"]["Where"] = {
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

    toWhereUnique(filter: FilterSource["Type"]["Repository"]["Filter"]): IFilterRepositorySchemaEx["Type"]["WhereUnique"] {
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
