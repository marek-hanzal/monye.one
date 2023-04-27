/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {
	type IQueryProviderProps,
	QueryProvider
} from "@leight/source-client";
import {type ICalendarEventSourceSchemaType} from "@monye.one/book";
import {type FC} from "react";
import {CalendarEventSourceStore} from "./CalendarEventSourceStore";

export interface ICalendarEventQueryProviderProps extends IQueryProviderProps<ICalendarEventSourceSchemaType> {
}

/**
 * Provides all Query parts for CalendarEvent used in fetching and sorting its data. 
 */
export const CalendarEventQueryProvider: FC<ICalendarEventQueryProviderProps> = props => {
    return <QueryProvider<ICalendarEventSourceSchemaType>
        SourceStore={CalendarEventSourceStore}
        {...props}
    />;
};
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_ba14p2r24b7jkwh0tssxzuzi = true;