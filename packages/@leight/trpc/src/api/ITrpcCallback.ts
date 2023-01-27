import { type ZodType } from "zod";
import { type ITrpcProps } from "./ITrpcProps";

export type ITrpcCallback<TRequest extends ZodType, TResponse> = (
    props: ITrpcProps<TRequest>
) => TResponse;
