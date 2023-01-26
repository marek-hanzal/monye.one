import { type ZodType } from "zod";
import { type ITrpcProps } from "./ITrpcProps";

export type ITrpcCallback<TZodType extends ZodType, TReturnType> = ({
    input,
}: ITrpcProps<TZodType>) => TReturnType;
