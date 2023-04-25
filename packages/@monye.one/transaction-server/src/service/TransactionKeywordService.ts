import {
    $KeywordSource,
    type IKeywords,
    type IKeywordService,
    type IKeywordSource
}                               from "@leight/keyword";
import {AbstractKeywordService} from "@leight/keyword-server";
import {
    $TransactionKeywordSource,
    type ITransactionKeywordSource,
    type ITransactionSourceSchemaType
}                               from "@monye.one/transaction";

export class TransactionKeywordService extends AbstractKeywordService<ITransactionSourceSchemaType["Entity"]> {
    static inject = [
        $KeywordSource,
        $TransactionKeywordSource,
    ];

    constructor(
        keywordSource: IKeywordSource,
        protected transactionKeywordSource: ITransactionKeywordSource,
    ) {
        super(keywordSource);
    }

    async onBuild({input}: IKeywordService.IOnBuildProps<ITransactionSourceSchemaType["Entity"]>): Promise<any> {
        return this.transactionKeywordSource.deleteWith({
            filter: {
                transactionId: input.id,
            },
        });
    }

    async keywordsOf(input: ITransactionSourceSchemaType["Entity"]): Promise<IKeywords> {
        return [
            input.note,
            input.target,
            input.static,
            input.variable,
            input.symbol,
            input.bank.account,
            input.bank.description,
        ];
    }

    async onKeyword({entity, input}: IKeywordService.IOnKeywordProps<ITransactionSourceSchemaType["Entity"]>): Promise<any> {
        return this.transactionKeywordSource.create({
            keywordId: entity.id,
            transactionId: input.id,
        });
    }
}
