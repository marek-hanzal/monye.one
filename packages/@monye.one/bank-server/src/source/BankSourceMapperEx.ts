import {DateTime}               from "@leight/i18n";
import {decimalOf}              from "@leight/prisma";
import {
    $UserService,
    type IUserService
}                               from "@leight/user";
import {type IBankSourceSchema} from "@monye.one/bank";
import {BankBaseSourceMapper}   from "../sdk/ServerSourceMapper/BankBaseSourceMapper";

export class BankSourceMapperEx extends BankBaseSourceMapper {
    static inject = [
        $UserService,
    ];

    constructor(protected userService: IUserService) {
        super();
    }

    async toCreate({balance, ...create}: IBankSourceSchema["ToCreate"]): Promise<IBankSourceSchema["Create"]> {
        return {
            ...create,
            balanceValue: balance?.value,
            balanceDate:  balance?.date ? DateTime.fromISO(balance.date).toJSDate() : undefined,
            userId:       this.userService.required(),
        };
    }

    async toDto({description, balanceDate, balanceValue, ...entity}: IBankSourceSchema["Entity"]): Promise<IBankSourceSchema["Dto"]> {
        return {
            ...entity,
            description: description,
            balance:     balanceDate && balanceValue !== undefined ? {
                value: decimalOf(balanceValue),
                date:  balanceDate.toISOString(),
            } : undefined,
        };
    }
}
