import {type IContainer} from "@leight/container";
import {type INextHandler} from "./INextHandler";

export type IEndpointFactory<TResponse> = (
    container: IContainer,
    withTokens?: string[]
) => INextHandler<TResponse>;
