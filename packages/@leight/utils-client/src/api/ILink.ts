import {type IHrefProps} from "@leight/utils";
import {type ReactNode}  from "react";

export interface ILink extends IHrefProps {
    label?: string;
    icon?: ReactNode;
}
