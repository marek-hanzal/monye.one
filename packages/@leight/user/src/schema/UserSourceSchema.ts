import {
    UserOptionalDefaultsSchema,
    UserPartialSchema,
    UserSchema
}          from "@leight/prisma";
import {
    PatchSchema,
    SortOrderSchema,
    type Source,
    withSourceSchema
}          from "@leight/source";
import {z} from "@leight/zod";

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
export type UserSource = Source<typeof UserSourceSchema>;
