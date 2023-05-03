import {type ILabelSourceSchemaType} from "@leight/label";
import {
    $UserService,
    IUserService
}                                    from "@leight/user";
import {LabelBaseSourceMapper}       from "../sdk";

export class LabelSourceMapper extends LabelBaseSourceMapper {
    static inject = [
        $UserService,
    ];

    constructor(
        protected userService: IUserService,
    ) {
        super();
    }

    async toCreate(create: ILabelSourceSchemaType["ToCreate"]): Promise<ILabelSourceSchemaType["Create"]> {
        return {
            ...create,
            userId: this.userService.required(),
        };
    }

    async toPatch(patch: ILabelSourceSchemaType["ToPatch"]): Promise<ILabelSourceSchemaType["Patch"]> {
        return {
            ...patch,
            userId: this.userService.required(),
        };
    }
}
