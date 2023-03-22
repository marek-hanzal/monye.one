// Generated file
import {
	type IContainer,
	ServiceContext
} from "@leight/container";
import {withCursor} from "@leight/query";
import {
	$PrismaClient,
	type PrismaClient
} from "@leight/prisma";
import {
	type ISource,
	withUpsert
} from "@leight/source";
import {AbstractSource} from "@leight/source-server";
import {withSourceProcedure} from "@leight/trpc-server";
import {
	$JobSource,
	JobQuerySchema,
	type IJobSource,
	type IJobSourceSchema
} from "@leight/job";

export class JobBaseSource extends AbstractSource<IJobSourceSchema> implements IJobSource {
	static inject = [
        $PrismaClient,
    ];

    constructor(
        protected prismaClient: PrismaClient,
    ) {
        super($JobSource);
    }

    async runUpsert(props: ISource.IUpsert<IJobSourceSchema>): Promise<IJobSourceSchema["Entity"]> {
        return this.prismaClient.job.upsert(withUpsert(props));
    }

    async runCount(query?: IJobSourceSchema["Query"]): Promise<number> {
        return this.prismaClient.job.count({
            where: query?.filter,
        });
    }

    async runQuery(query?: IJobSourceSchema["Query"]): Promise<IJobSourceSchema["Entity"][]> {
        return this.prismaClient.job.findMany(withCursor({
            query,
            arg: {
                where:   query?.filter,
                orderBy: query?.sort,
            }
        }));
    }
}

export const JobSourceContext = (container: IContainer) => new ServiceContext<IJobSource>(container, $JobSource);
export const JobSourceProcedure = withSourceProcedure<IJobSourceSchema>({
    source: $JobSource,
    schema: JobQuerySchema,
});