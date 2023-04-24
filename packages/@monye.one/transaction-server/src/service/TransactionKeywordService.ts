import {
    type IKeywords,
    type IKeywordService
}                                          from "@leight/keyword";
import {AbstractKeywordService}            from "@leight/keyword-server";
import {type ITransactionSourceSchemaType} from "@monye.one/transaction";

export class TransactionKeywordService extends AbstractKeywordService<ITransactionSourceSchemaType["Entity"]> {
    async keywordsOf(input: ITransactionSourceSchemaType["Entity"]): Promise<IKeywords> {
        return [
            input.note,
            input.target,
            input.static,
            input.variable,
            input.symbol,
            input.bank.account,
        ];
    }

    async onKeyword({entity, input}: IKeywordService.IOnKeywordProps<ITransactionSourceSchemaType["Entity"]>): Promise<void> {
        // nope
    }
}
