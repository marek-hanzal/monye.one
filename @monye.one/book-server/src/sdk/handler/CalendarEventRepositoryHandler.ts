/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {withRepositoryHandler} from "@leight/trpc-source-server";
import {
	$CalendarEventRepositoryService,
	type CalendarEventSource
} from "@monye.one/book";

export const CalendarEventRepositoryHandler = withRepositoryHandler<CalendarEventSource["Schema"]["Service"]>({
    service: $CalendarEventRepositoryService,
});
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_c6eyrepdse3i4ih9m0zn55cn = true;