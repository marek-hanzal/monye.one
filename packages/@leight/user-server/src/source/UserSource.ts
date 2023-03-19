import {
    $PrismaClient,
    type PrismaClient
}                       from "@leight/prisma";
import {AbstractSource} from "@leight/source-server";
import {
    $UserSource,
    type IUserSource,
    type IUserSourceSchema,
}                       from "@leight/user";

export class UserSource extends AbstractSource<IUserSourceSchema> implements IUserSource {
    static inject = [
        $PrismaClient,
    ];

    constructor(
        protected prismaClient: PrismaClient,
    ) {
        super($UserSource);
    }

    runFind(id: string): Promise<IUserSourceSchema["Entity"]> {
        return this.prismaClient.user.findUniqueOrThrow({
            where: {id},
        });
    }

    runCount({filter: {fulltext, ...where} = {}}: IUserSourceSchema["Query"]): Promise<number> {
        return this.prismaClient.user.count({
            where,
        });
    }

    async findByEmail(email: string): Promise<IUserSourceSchema["Entity"]> {
        return this.prismaClient.user.findUniqueOrThrow({
            where: {
                email,
            }
        });
    }
}
