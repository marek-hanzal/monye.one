import { type ReactNode } from "react";
import { type IContextRender } from "./IContextRender";

export type IProviderChildren<TContext> = ReactNode | IContextRender<TContext>;
