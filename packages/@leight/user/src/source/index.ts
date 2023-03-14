import {
    type ISource,
    type ISourceSchema
} from "@leight/source";
import {
    type IUserCreateSchema,
    type IUserPatchSchema,
    type IUserSchema
} from "../schema";

export interface IUserSourceSchema extends ISourceSchema<
    IUserSchema,
    IUserCreateSchema,
    IUserPatchSchema
> {
}

export interface IUserSource extends ISource<IUserSourceSchema> {
    findByEmail(email: string): Promise<IUserSourceSchema["Entity"]>;
}

export const $UserSource = Symbol.for("@leight/user/IUserSource");
