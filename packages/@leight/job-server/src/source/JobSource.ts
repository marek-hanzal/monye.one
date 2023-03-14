import {
    $JobSource,
    type IJobSource,
    type IJobSourceSchema,
}                       from "@leight/job";
import {
    $PrismaClient,
    type PrismaClient
}                       from "@leight/prisma";
import {withPatch}      from "@leight/source";
import {AbstractSource} from "@leight/source-server";

export class JobSource extends AbstractSource<IJobSourceSchema> implements IJobSource {
    static inject = [
        $PrismaClient,
    ];

    constructor(
        protected prismaClient: PrismaClient,
    ) {
        super($JobSource);
    }

    async runFind(id: string): Promise<IJobSourceSchema["Entity"]> {
        return this.prismaClient.job.findUniqueOrThrow({where: {id}});
    }

    async runCreate(entity: IJobSourceSchema["Create"]): Promise<IJobSourceSchema["Entity"]> {
        return this.prismaClient.job.create({
            data: entity,
        });
    }

    async runPatch(patch: IJobSourceSchema["Patch"]): Promise<IJobSourceSchema["Entity"]> {
        return this.prismaClient.job.update(withPatch(patch));
    }
}
