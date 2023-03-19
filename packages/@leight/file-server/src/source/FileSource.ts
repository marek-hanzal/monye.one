import {
    $FileSource,
    type IFileSource,
    type IFileSourceSchema
}                       from "@leight/file";
import {
    $PrismaClient,
    type PrismaClient
}                       from "@leight/prisma";
import {
    type ISource,
    withUpsert
}                       from "@leight/source";
import {AbstractSource} from "@leight/source-server";

export class FileSource extends AbstractSource<IFileSourceSchema> implements IFileSource {
    static inject = [
        $PrismaClient,
    ];

    constructor(
        protected prismaClient: PrismaClient,
    ) {
        super($FileSource);
    }

    async runFind(id: string): Promise<IFileSourceSchema["Entity"]> {
        return this.prismaClient.file.findUniqueOrThrow({where: {id}});
    }

    async runUpsert(props: ISource.IUpsert<IFileSourceSchema>): Promise<IFileSourceSchema["Entity"]> {
        return this.prismaClient.file.upsert(withUpsert(props));
    }
}
