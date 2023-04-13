import {type ReactNode} from "react";

export type IContextRender<TContext> = (context: TContext) => ReactNode;

export type IProviderChildren<TContext> =
    ReactNode
    | IContextRender<TContext>;
