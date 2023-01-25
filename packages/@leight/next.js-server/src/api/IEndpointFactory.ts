import { container } from "tsyringe";
import { type INextHandler } from "./INextHandler";

export type IEndpointFactory<TResponse> = (
    target: typeof container,
    withTokens?: string[]
) => INextHandler<TResponse>;
