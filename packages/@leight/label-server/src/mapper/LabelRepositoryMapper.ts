import {type LabelSource} from "@leight/label";
import {$UserService, type IUserService} from "@leight/user";
import {BaseLabelRepositoryMapper} from "../sdk";

export class LabelRepositoryMapper extends BaseLabelRepositoryMapper {
    static inject = [
        $UserService,
    ];

    constructor(
        protected userService: IUserService,
    ) {
        super();
    }

    async toCreate(create: LabelSource["Type"]["ToCreate"]): Promise<LabelSource["Type"]["Create"]> {
        return {
            ...create,
            userId: this.userService.required(),
        };
    }

    async toPatch(patch: LabelSource["Type"]["ToPatch"]): Promise<LabelSource["Type"]["Patch"]> {
        return {
            ...patch,
            userId: this.userService.required(),
        };
    }
}
