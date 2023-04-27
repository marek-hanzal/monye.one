/**
	Base Source contains default implementation of Source for entity Transaction. This could be used for further extensions,
    also default export uses this as a parent class.
 */
import {AbstractSource} from "@leight/source-server";
import {
	$TransactionSource,
	type ITransactionSourceSchemaType
} from "@monye.one/transaction";

export class TransactionBaseSource extends AbstractSource<ITransactionSourceSchemaType> {
	constructor() {
        super($TransactionSource);
    }
}

/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_w6zbkyrp203ny4ljinj1xb39 = true;