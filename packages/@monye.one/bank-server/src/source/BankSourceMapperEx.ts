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

    async toCreate(create: IBankSourceSchema["ToCreate"]): Promise<IBankSourceSchema["Create"]> {
        return {
            ...create,
            userId: this.userService.required(),
        };
    }
}
