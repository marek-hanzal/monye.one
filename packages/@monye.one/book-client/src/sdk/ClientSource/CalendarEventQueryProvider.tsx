/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {
	type IQueryProviderProps,
	QueryProvider
} from "@leight/query-client";
import {type ICalendarEventSourceSchema} from "@monye.one/book";
import {type FC} from "react";
import {CalendarEventSourceStore} from "./CalendarEventSourceStore";
import {UseCalendarEventSourceQuery} from "../ClientTrpc/UseCalendarEventSourceQuery";

export interface ICalendarEventQueryProviderProps extends IQueryProviderProps<ICalendarEventSourceSchema> {
}

/**
 * Provides all Query parts for CalendarEvent used in fetching and sorting its data. 
 */
export const CalendarEventQueryProvider: FC<ICalendarEventQueryProviderProps> = props => {
    return <QueryProvider<ICalendarEventSourceSchema>
        SourceStore={CalendarEventSourceStore}
        UseSourceQuery={UseCalendarEventSourceQuery}
		{...props}
    />;
};
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_e91w6njp4asdfu3d96l54lm2 = true;