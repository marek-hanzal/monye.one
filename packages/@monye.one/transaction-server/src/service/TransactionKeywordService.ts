import {$KeywordRepository, type IKeywordRepository, type IKeywords, type IKeywordService} from "@leight/keyword";
import {AbstractKeywordService} from "@leight/keyword-server";
import {$TransactionKeywordRepository, type ITransactionKeywordRepository, TransactionSource} from "@monye.one/transaction";

export class TransactionKeywordService extends AbstractKeywordService<TransactionSource["Type"]["Entity"]> {
    static inject = [
        $KeywordRepository,
        $TransactionKeywordRepository,
    ];

    constructor(
        keywordSource: IKeywordRepository,
        protected transactionKeywordSource: ITransactionKeywordRepository,
    ) {
        super(keywordSource);
    }

    async onBuild({input}: IKeywordService.IOnBuildProps<TransactionSource["Type"]["Entity"]>): Promise<any> {
        return this.transactionKeywordSource.deleteBy({
            transactionId: input.id,
        });
    }

    async keywordsOf(input: TransactionSource["Type"]["Entity"]): Promise<IKeywords> {
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

    async onKeyword({entity, input}: IKeywordService.IOnKeywordProps<TransactionSource["Type"]["Entity"]>): Promise<any> {
        return this.transactionKeywordSource.create({
            keywordId: entity.id,
            transactionId: input.id,
        });
    }
}
