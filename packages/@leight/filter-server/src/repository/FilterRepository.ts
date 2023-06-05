import {
    type IFilterRepositoryExType,
    type IFilterSourceType
}                   from "@leight/filter";
import {
    $UserService,
    type IUserService
}                   from "@leight/user";
import {keywordsOf} from "@leight/utils";

export class FilterRepository {
    static inject = [
        $UserService,
    ];

    constructor(
        protected userService: IUserService,
    ) {
    }

    toWhere(filter?: IFilterSourceType["Repository"]["Filter"]): IFilterRepositoryExType["Where"] | undefined {
        if (!filter) {
            return;
        }

        const where: IFilterRepositoryExType["Where"] = {
            AND:    [],
            userId: this.userService.required(),
        };

        const {
            fulltext,
            type,
            id,
            ids
        } = filter;

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

    toWhereUnique(filter: IFilterSourceType["Repository"]["Filter"]): IFilterRepositoryExType["WhereUnique"] {
        const {
            id,
        } = filter;

        if (id) {
            return {
                id,
            };
        }
        // if (type_name) {
        //     return {
        //         userId_type_name: {
        //             userId: this.userService.required(),
        //             ...type_name,
        //         },
        //     };
        // }
        return {};
    }
}
