/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {AbstractRepository} from "@leight/source-server";
import {
	$CalendarEventRepository,
	type CalendarEventSource
} from "@monye.one/book";

export class BaseCalendarEventRepository extends AbstractRepository<CalendarEventSource["Schema"]["Repository"]> {
	constructor() {
        super($CalendarEventRepository);
    }
}

/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_e8j4yhs9o754tj2cuh7ffrub = true;