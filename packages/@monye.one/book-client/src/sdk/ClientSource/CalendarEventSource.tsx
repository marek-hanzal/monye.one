/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {
	type ISourceProps,
	Source
} from "@leight/source-client";
import {
	type ICalendarEventSourceSchemaType,
	CalendarEventSourceSchema
} from "@monye.one/book";
import {type FC} from "react";
import {CalendarEventSourceStore} from "./CalendarEventSourceStore";
import {UseCalendarEventSourceQuery} from "../ClientTrpc/UseCalendarEventSourceQuery";

export interface ICalendarEventSourceProps extends ISourceProps<ICalendarEventSourceSchemaType> {
}

/**
 * Provides access to CalendarEvent data with a connection to filtering and sorting. 
 */
export const CalendarEventSource: FC<ICalendarEventSourceProps> = props => {
    return <Source<ICalendarEventSourceSchemaType>
        schema={CalendarEventSourceSchema["EntitySchema"]}
        SourceStore={CalendarEventSourceStore}
        UseSourceQuery={UseCalendarEventSourceQuery}
		{...props}
    />;
};
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_v85qgtsxbhiwun9aribhb3wt = true;