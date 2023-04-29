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
        return {
            ...filter,
            userId: this.userService.required(),
        };
    }
}
