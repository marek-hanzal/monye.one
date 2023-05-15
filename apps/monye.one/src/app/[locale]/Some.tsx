"use client";

import {action} from "@/monye.one/app/[locale]/action";
import {
    useState,
    useTransition
}               from "react";

export const Some = () => {
    const [foo, setFoo] = useState<string>();
    const [isPending, startTransition] = useTransition();
    return <>
        <button
            onClick={async () => startTransition(async () => setFoo(await action("blabla")))}
        >
            klyk
        </button>
        {isPending ? "????" : <div>{foo}</div>}
    </>;
};
