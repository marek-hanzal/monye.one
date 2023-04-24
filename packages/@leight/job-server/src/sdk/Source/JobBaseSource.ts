/**
	Base Source contains default implementation of Source for entity Job. This could be used for further extensions,
    also default export uses this as a parent class.
 */
import {AbstractSource} from "@leight/source-server";
import {
	$JobSource,
	type IJobSourceSchemaType
} from "@leight/job";

export class JobBaseSource extends AbstractSource<IJobSourceSchemaType> {
	constructor() {
        super($JobSource);
    }
}

/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_p775d4omecv93da84fnl7yit = true;