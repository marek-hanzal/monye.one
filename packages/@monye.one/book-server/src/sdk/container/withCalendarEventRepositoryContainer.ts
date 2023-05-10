/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {type IContainer} from "@leight/container";
import {BaseCalendarEventRepository} from "../repository/BaseCalendarEventRepository";
import {BaseCalendarEventRepositoryMapper} from "../mapper/BaseCalendarEventRepositoryMapper";
import {BaseCalendarEventRepositoryService} from "../service/BaseCalendarEventRepositoryService";
import {
	$CalendarEventRepository,
	$CalendarEventRepositoryMapper,
	$CalendarEventRepositoryService
} from "@monye.one/book";

export const withCalendarEventRepositoryContainer = (container: IContainer) => {
    container.bindClass($CalendarEventRepository, BaseCalendarEventRepository);
    container.bindClass($CalendarEventRepositoryMapper, BaseCalendarEventRepositoryMapper);
    container.bindClass($CalendarEventRepositoryService, BaseCalendarEventRepositoryService);
};
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_ehveg16a00k0azyiu1y8amfx = true;