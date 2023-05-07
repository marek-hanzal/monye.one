import {
    type FC,
    type ReactNode
} from "react";

export type IProviderChildren<TContext> =
    ReactNode
    | FC<TContext>;
