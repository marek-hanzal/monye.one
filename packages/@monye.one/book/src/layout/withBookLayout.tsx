import {type IPageWithLayout} from "@leight/layout";
import {type FC}              from "react";
import {
    BookLayout,
    IBookLayoutProps
}                             from "./BookLayout";

export function withBookLayout(Component: FC<any>, props: IBookLayoutProps) {
    (Component as unknown as IPageWithLayout).layout = children => {
        return <BookLayout {...props}>
            {children}
        </BookLayout>;
    };
    return Component;
}
