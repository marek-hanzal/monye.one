import {type ReactNode}  from "react";
import {type IHrefProps} from "./IHrefProps";

export interface ILink extends IHrefProps {
    label?: string;
    icon?: ReactNode;
}
