import { type ReactNode } from "react";
import { type IHrefProps } from "@leight/utils";

export interface ILink extends IHrefProps {
    label?: string;
    icon?: ReactNode;
}
