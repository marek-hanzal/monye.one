import {type IPageWithLayout} from "@leight/layout";
import {type FC}              from "react";
import {
    IPublicLayoutProps,
    PublicLayout
}                             from "./PublicLayout";

export function withPublicLayout(Component: FC<any>, props: IPublicLayoutProps) {
    (Component as unknown as IPageWithLayout).layout = children => {
        return <PublicLayout {...props}>
            {children}
        </PublicLayout>;
    };
    return Component;
}
