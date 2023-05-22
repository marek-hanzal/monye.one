import {type Metadata}          from "next";
import {type PropsWithChildren} from "react";

export const metadata: Metadata = {
    title: "Monye.one",
};

export default function Layout({children}: PropsWithChildren) {
    return <>
        {children}
    </>;
}
