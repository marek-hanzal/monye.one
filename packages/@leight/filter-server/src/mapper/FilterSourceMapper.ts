import {type IFilterSourceSchemaType} from "@leight/filter";
import {
    $UserService,
    type IUserService
}                                     from "@leight/user";
import {Pack}                         from "@leight/utils";
import {FilterBaseSourceMapper}       from "../sdk";

export class FilterSourceMapper extends FilterBaseSourceMapper {
    static inject = [
        $UserService,
    ];

    constructor(protected userService: IUserService) {
        super();
    }

    async toDto({filter, dto, ...entity}: IFilterSourceSchemaType["Entity"]): Promise<IFilterSourceSchemaType["Dto"]> {
        return {
            ...entity,
            filter: Pack.unpack(filter),
            dto:    Pack.unpackIf(dto),
        };
    }

    async toCreate({filter, dto, ...create}: IFilterSourceSchemaType["ToCreate"]): Promise<IFilterSourceSchemaType["Create"]> {
        return {
            ...create,
            filter: await Pack.pack(filter),
            dto:    await Pack.packIf(dto),
            userId: this.userService.required(),
        };
    }

    async toPatch({filter, dto, ...patch}: IFilterSourceSchemaType["ToPatch"]): Promise<IFilterSourceSchemaType["Patch"]> {
        return {
            ...patch,
            filter: await Pack.pack(filter),
            dto:    await Pack.packIf(dto),
            userId: this.userService.required(),
        };
    }
}
