/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {AbstractSourceService} from "@leight/source-server";
import {
	type ISourceService,
	type ISourceMapper,
	type ISource
} from "@leight/source";
import {
	$CalendarEventSource,
	$CalendarEventSourceMapper,
	type ICalendarEventSourceSchemaType
} from "@monye.one/book";

export interface ICalendarEventSourceService extends ISourceService<ICalendarEventSourceSchemaType> {
}

export class CalendarEventBaseSourceService extends AbstractSourceService<ICalendarEventSourceSchemaType> implements ICalendarEventSourceService {
	static inject = [
        $CalendarEventSource,
        $CalendarEventSourceMapper,
    ];
    
    constructor(
        protected $source: ISource<ICalendarEventSourceSchemaType>,
        protected $mapper: ISourceMapper<ICalendarEventSourceSchemaType>,
    ) {
        super();
    }
    
    source(): ISource<ICalendarEventSourceSchemaType> {
        return this.$source;
    }
    
    mapper(): ISourceMapper<ICalendarEventSourceSchemaType> {
        return this.$mapper;
    }
}

/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_s7whkmxl42z1c68qpkyspdg9 = true;