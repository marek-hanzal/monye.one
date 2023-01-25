import { type ReactNode } from "react";

export type IContextRender<TContext> = (context: TContext) => ReactNode;
