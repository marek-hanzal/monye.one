import {DateTime} from "@leight/i18n";
import {decimalOf} from "@leight/prisma";
import {$UserService, type IUserService} from "@leight/user";
import {BankSource} from "@monye.one/bank";
import {BaseBankRepositoryMapper} from "../sdk";

export class BankRepositoryMapper<
    TRepositoryMapperType extends BankSource["Type"]["Mapper"] = BankSource["Type"]["Mapper"]
> extends BaseBankRepositoryMapper {
    static inject = [
        $UserService,
    ];

    constructor(protected userService: IUserService) {
        super();
    }

    async toCreate({balance, ...create}: TRepositoryMapperType["ToCreate"]): Promise<TRepositoryMapperType["Create"]> {
        return {
            ...create,
            balanceValue: balance?.value,
            balanceDate: balance?.date ? DateTime.fromISO(balance.date).toJSDate() : undefined,
            userId: this.userService.required(),
        };
    }

    async toPatch({balance, ...patch}: TRepositoryMapperType["ToPatch"]): Promise<TRepositoryMapperType["Patch"]> {
        return {
            ...patch,
            balanceValue: balance?.value,
            balanceDate: balance?.date ? DateTime.fromISO(balance.date).toJSDate() : undefined,
            userId: this.userService.required(),
        };
    }

    async toDto({description, balanceDate, balanceValue, ...entity}: TRepositoryMapperType["Entity"]): Promise<TRepositoryMapperType["Dto"]> {
        return {
            ...entity,
            description: description || undefined,
            balance: balanceDate && balanceValue !== undefined ? {
                value: decimalOf(balanceValue),
                date: balanceDate.toISOString(),
            } : undefined,
        };
    }
}
