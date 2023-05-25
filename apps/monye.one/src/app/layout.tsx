import {type Metadata}          from "next";
import {type PropsWithChildren} from "react";

export const metadata: Metadata = {
    title: "Monye.one",
};

export default function Layout({children}: PropsWithChildren) {
    return <>
        <h1>
            Try pluralized translations<br/>
            https://next-intl-docs.vercel.app/docs/usage/messages
        </h1>
        {children}
    </>;
}
