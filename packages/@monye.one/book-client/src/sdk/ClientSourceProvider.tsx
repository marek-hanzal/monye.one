/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {
	type ISourceProps,
	Source
} from "@leight/source-client";
import {
	type IQueryProviderProps,
	QueryProvider
} from "@leight/query-client";
import {
	type ICalendarEventSourceSchema,
	CalendarEventSchema
} from "@monye.one/book";
import {type FC} from "react";
import {
	CalendarEventSourceStore,
	CalendarEventSortStore
} from "./ClientStore";
import {trpc} from "@monye.one/trpc-client";

export interface ICalendarEventSourceProps extends ISourceProps<ICalendarEventSourceSchema> {
}

export interface ICalendarEventQueryProviderProps extends IQueryProviderProps<ICalendarEventSourceSchema> {
}

/**
 * Provides access to CalendarEvent data with a connection to filtering and sorting. 
 */
export const CalendarEventSource:FC<ICalendarEventSourceProps> = props => {
    return <Source<ICalendarEventSourceSchema>
        schema={CalendarEventSchema}
        SourceProvider={CalendarEventSourceStore.Provider}
        useSortState={CalendarEventSortStore.useState}
        useSourceQuery={trpc.book.calendar.event.source.query.useQuery}
		{...props}
    />;
};
/**
 * Provides all Query parts for CalendarEvent used in fetching and sorting its data. 
 */
export const CalendarEventQueryProvider:FC<ICalendarEventQueryProviderProps> = props => {
    return <QueryProvider<ICalendarEventSourceSchema>
        SortProvider={CalendarEventSortStore.Provider}
        useCountQuery={trpc.book.calendar.event.source.count.useQuery}
		{...props}
    />;
};
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_rw1veykj5be2ga5yzx0q087v = true;