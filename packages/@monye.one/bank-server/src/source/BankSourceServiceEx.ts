import {type ISourceService}    from "@leight/source";
import {type IBankSourceSchema} from "@monye.one/bank";
import {
    BankBaseSourceService,
    type IBankSourceService
}                               from "../sdk/ServerSourceService/BankBaseSourceService";

export class BankSourceServiceEx extends BankBaseSourceService implements IBankSourceService {
    async handleCreate({toCreate}: ISourceService.IHandleCreateProps<IBankSourceSchema>): Promise<IBankSourceSchema["Dto"]> {
        console.log("Bank source create!!");
        return super.handleCreate({toCreate});
    }
}
