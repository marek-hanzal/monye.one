import { type FC, type ReactNode } from "react";

export interface IPageWithLayout extends FC {
    layout(page: ReactNode): ReactNode;
}
