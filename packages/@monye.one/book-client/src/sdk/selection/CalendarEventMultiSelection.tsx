/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {createMultiSelectionStore} from "@leight/selection-client";
import {type IStoreContext} from "@leight/context";
import {type IMultiSelectionStoreProps} from "@leight/selection";
import {type ICalendarEventSourceType as SourceType} from "@monye.one/book";

export type ICalendarEventMultiSelectionStore = IStoreContext<IMultiSelectionStoreProps<SourceType["Dto"]>>;

export const CalendarEventMultiSelection = createMultiSelectionStore<SourceType["Dto"]>({name: "CalendarEvent"});
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_o9of49ygjfumngbzhdedietj = true;