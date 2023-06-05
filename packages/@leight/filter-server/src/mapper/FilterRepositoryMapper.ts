import {FilterSource}               from "@leight/filter";
import {
    $UserService,
    type IUserService
}                                   from "@leight/user";
import {Pack}                       from "@leight/utils";
import {BaseFilterRepositoryMapper} from "../sdk";

export class FilterRepositoryMapper extends BaseFilterRepositoryMapper {
    static inject = [
        $UserService,
    ];

    constructor(protected userService: IUserService) {
        super();
    }

    async toDto({filter, dto, ...entity}: FilterSource["Type"]["Repository"]["Entity"]): Promise<FilterSource["Type"]["Mapper"]["Dto"]> {
        return {
            ...entity,
            filter: await Pack.unpack(filter),
            dto:    await Pack.unpackIf(dto),
        };
    }

    async toCreate({filter, dto, ...create}: FilterSource["Type"]["Mapper"]["ToCreate"]): Promise<FilterSource["Type"]["Repository"]["Create"]> {
        return {
            ...create,
            filter: await Pack.pack(filter),
            dto:    await Pack.packIf(dto),
            userId: this.userService.required(),
        };
    }

    async toPatch({filter, dto, ...patch}: FilterSource["Type"]["Mapper"]["ToPatch"]): Promise<FilterSource["Type"]["Repository"]["Patch"]> {
        return {
            ...patch,
            filter: await Pack.pack(filter),
            dto:    await Pack.packIf(dto),
            userId: this.userService.required(),
        };
    }
}
