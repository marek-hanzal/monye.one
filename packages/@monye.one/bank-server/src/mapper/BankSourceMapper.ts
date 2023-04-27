import {DateTime}                   from "@leight/i18n";
import {decimalOf}                  from "@leight/prisma";
import {
    $UserService,
    type IUserService
}                                   from "@leight/user";
import {type IBankSourceSchemaType} from "@monye.one/bank";
import {BankBaseSourceMapper}       from "../sdk";

export class BankSourceMapper extends BankBaseSourceMapper {
    static inject = [
        $UserService,
    ];

    constructor(protected userService: IUserService) {
        super();
    }

    async toCreate({balance, ...create}: IBankSourceSchemaType["ToCreate"]): Promise<IBankSourceSchemaType["Create"]> {
        return {
            ...create,
            balanceValue: balance?.value,
            balanceDate:  balance?.date ? DateTime.fromISO(balance.date).toJSDate() : undefined,
            userId:       this.userService.required(),
        };
    }

    async toPatch({balance, ...patch}: IBankSourceSchemaType["ToPatch"]): Promise<IBankSourceSchemaType["Patch"]> {
        return {
            ...patch,
            balanceValue: balance?.value,
            balanceDate:  balance?.date ? DateTime.fromISO(balance.date).toJSDate() : undefined,
            userId:       this.userService.required(),
        };
    }

    async toDto({description, balanceDate, balanceValue, ...entity}: IBankSourceSchemaType["Entity"]): Promise<IBankSourceSchemaType["Dto"]> {
        return {
            ...entity,
            description: description || undefined,
            balance:     balanceDate && balanceValue !== undefined ? {
                value: decimalOf(balanceValue),
                date:  balanceDate.toISOString(),
            } : undefined,
        };
    }
}
