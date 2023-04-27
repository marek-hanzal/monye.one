import {z} from "@leight/zod";
import {
    type IJobParamsSchema,
    type IJobSourceSchemaType
}          from "../schema";

export type IJobWithParams<TParamsSchema extends IJobParamsSchema> =
    IJobSourceSchemaType["Dto"]
    & {
        params: z.infer<TParamsSchema>;
    }
