import {
    type ILabelRepositoryExType,
    type ILabelSourceType
}                              from "@leight/label";
import {
    $PrismaClient,
    PrismaClient
}                              from "@leight/prisma";
import {
    $UserService,
    type IUserService
}                              from "@leight/user";
import {keywordsOf}            from "@leight/utils";
import {BaseLabelRepositoryEx} from "../sdk";

export class LabelRepository extends BaseLabelRepositoryEx {
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

    toWhere(label?: ILabelSourceType["Filter"]): ILabelRepositoryExType["Where"] | undefined {
        if (!label) {
            return;
        }

        const where: ILabelRepositoryExType["Where"] = {
            AND:    [],
            userId: this.userService.required(),
        };

        const {
            fulltext,
            type,
            id,
            ids
        } = label;

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
                                label: {
                                    contains: item,
                                    mode:     "insensitive",
                                },
                            },
                            {
                                type: {
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

    toWhereUnique(label: ILabelSourceType["Filter"]): ILabelRepositoryExType["WhereUnique"] {
        const {id} = label;

        if (id) {
            return {
                id,
            };
        }

        return {};
    }
}
