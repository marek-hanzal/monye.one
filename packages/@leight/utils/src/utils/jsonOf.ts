import {z} from "zod";

export const jsonOf = <const TSchema extends z.ZodType>(schema: TSchema, json: string) => {
    return schema.parse(JSON.parse(json));
};
