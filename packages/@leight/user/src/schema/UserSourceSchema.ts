import {
    UserOptionalDefaultsSchema,
    UserPartialSchema,
    UserSchema
}          from "@leight/prisma";
import {
    PatchSchema,
    SortOrderSchema,
    withSourceSchema
}          from "@leight/source";
import {z} from "@leight/utils";

export const UserSourceSchema = withSourceSchema({
    EntitySchema:   UserSchema,
    DtoSchema:      UserSchema,
    ToCreateSchema: UserOptionalDefaultsSchema,
    CreateSchema:   UserOptionalDefaultsSchema,
    ToPatchSchema:  UserPartialSchema.merge(PatchSchema),
    PatchSchema:    UserPartialSchema.merge(PatchSchema),
    SortSchema:     z.object({
        id: SortOrderSchema,
    }),
});
