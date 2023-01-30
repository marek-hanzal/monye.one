import "reflect-metadata";
import {
    type ITransactionImportSchema,
    type ITransactionImportService,
    TransactionImportSchema
} from '@monye.one/transaction';
import {injectable} from "tsyringe";
import {ZodType} from "zod";

@injectable()
export class TransactionImportService implements ITransactionImportService {
    handler(item: ITransactionImportSchema): Promise<any> {
        console.log('Transaction Import of', item);
        return Promise.resolve(undefined);
    }

    validator(): ZodType | undefined {
        return TransactionImportSchema;
    }
}
