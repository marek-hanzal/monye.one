import "reflect-metadata";
import {
    type ITransactionImportSchema,
    type ITransactionImportService,
    TransactionImportSchema
} from '@monye.one/transaction';
import {inject, injectable} from "tsyringe";
import {ZodType} from "zod";
import {$PrismaClient} from "@leight/prisma";
import {PrismaClient} from "@prisma/client";
import {$UserService, type IUserService} from "@leight/user";

@injectable()
export class TransactionImportService implements ITransactionImportService {
    constructor(
        @inject($PrismaClient) protected prismaClient: PrismaClient,
        @inject($UserService) protected userService: IUserService,
    ) {
    }

    async handler({bank: account, ...item}: ITransactionImportSchema): Promise<any> {
        const bank = await this.prismaClient.bank.upsert({
            where: {
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
                    userId: this.userService.required(),
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
