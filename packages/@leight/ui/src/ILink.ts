import {type ReactNode} from "react";

export interface ILink {
    href: string;
    query?: Record<string, any>;
    label?: string;
    icon?: ReactNode;
}
