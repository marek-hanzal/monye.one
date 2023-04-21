import {z}                         from "@leight/zod";
import {type IJobParamsSchema}     from "../schema";
import {type IJobSourceSchemaType} from "../sdk";

export type IJobWithParams<TParamsSchema extends IJobParamsSchema> =
    IJobSourceSchemaType["Dto"]
    & {
        params: z.infer<TParamsSchema>;
    }
