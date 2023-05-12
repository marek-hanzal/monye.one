/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {AbstractRepositoryService} from "@leight/source-server";
import {
	type IRepositoryService,
	type IRepositoryMapper,
	type IRepository
} from "@leight/source";
import {
	$CalendarEventRepository,
	$CalendarEventRepositoryMapper,
	type CalendarEventSource
} from "@monye.one/book";

export interface ICalendarEventRepositoryService extends IRepositoryService<CalendarEventSource["Schema"]["Service"]> {
}

export class BaseCalendarEventRepositoryService<
    TServiceSchema extends CalendarEventSource["Schema"]["Service"] = CalendarEventSource["Schema"]["Service"]
> extends AbstractRepositoryService<TServiceSchema> implements ICalendarEventRepositoryService {
	static inject = [
        $CalendarEventRepository,
        $CalendarEventRepositoryMapper,
    ];
    
    constructor(
        protected $repository: IRepository<TServiceSchema>,
        protected $mapper: IRepositoryMapper<TServiceSchema>,
    ) {
        super();
    }

    mapper(): IRepositoryMapper<TServiceSchema> {
        return this.$mapper;
    }
    
    repository(): IRepository<TServiceSchema> {
        return this.$repository;
    }
}

/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_ptnro9wpctvouegu285l0c57 = true;