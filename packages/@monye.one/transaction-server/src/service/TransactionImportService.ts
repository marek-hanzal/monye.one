import {$PrismaClient} from "@leight/prisma";
import {
    $UserService,
    type IUserService
}                      from "@leight/user";
import {IPrismaClient} from "@monye.one/prisma";
import {
    type ITransactionImportSchema,
    type ITransactionImportService,
    TransactionImportSchema
}                      from "@monye.one/transaction";
import "reflect-metadata";
import {
    inject,
    injectable
}                      from "tsyringe";
import {ZodType}       from "zod";

@injectable()
export class TransactionImportService implements ITransactionImportService {
    constructor(
        @inject($PrismaClient) protected prismaClient: IPrismaClient,
        @inject($UserService) protected userService: IUserService,
    ) {
    }

    async handler({bank: account, ...item}: ITransactionImportSchema): Promise<any> {
        const bank = await this.prismaClient.bank.upsert({
            where:  {
                userId_account: {
                    userId: this.userService.required(),
                    account,
                },
            },
            create: {
                userId: this.userService.required(),
                account,
            },
            update: {
                userId: this.userService.required(),
                account,
            },
        });

        return this.prismaClient.transaction.upsert({
            where: {
                userId_reference: {
                    userId:    this.userService.required(),
                    reference: item.reference,
                },
            },
            create: {
                ...item,
                userId: this.userService.required(),
                bankId: bank.id,
            },
            update: {
                ...item,
                bankId: bank.id,
            },
        });
    }

    validator(): ZodType {
        return TransactionImportSchema;
    }
}
