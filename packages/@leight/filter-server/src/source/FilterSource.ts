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

        const {ids} = filter;
        if (ids && ids.length) {
            return {
                id: {
                    in: ids,
                },
            };
        }

        return {
            ...filter,
            userId: this.userService.required(),
        };
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
