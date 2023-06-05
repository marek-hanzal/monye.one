import logo                     from "@/monye.one/assets/logo/logo.svg";
import {PublicLayout}           from "@leight/mantine";
import {type PropsWithChildren} from "react";

export type ILayoutProps = PropsWithChildren;

export default function Layout({children}: ILayoutProps) {
    return <PublicLayout
        logo={logo}
    >
        {children}
    </PublicLayout>;
}
