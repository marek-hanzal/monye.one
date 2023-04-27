/**
	Base Source contains default implementation of Source for entity CalendarEvent. This could be used for further extensions,
    also default export uses this as a parent class.
 */
import {AbstractSource} from "@leight/source-server";
import {
	$CalendarEventSource,
	type ICalendarEventSourceSchemaType
} from "@monye.one/book";

export class CalendarEventBaseSource extends AbstractSource<ICalendarEventSourceSchemaType> {
	constructor() {
        super($CalendarEventSource);
    }
}

/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_gtz0vaa0z5yb6r2em6awiyzb = true;