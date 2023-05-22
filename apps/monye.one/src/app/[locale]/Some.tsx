"use client";

import {action} from "@/monye.one/app/[locale]/action";
import {Button} from "@mantine/core";
import {
    useState,
    useTransition
}               from "react";

export const Some = () => {
    const [foo, setFoo] = useState<string>();
    const [isPending, startTransition] = useTransition();
    return <>
        <Button
            onClick={async () => startTransition(async () => setFoo(await action("blabla")))}
        >
            klyk
        </Button>
        {isPending ? "????" : <div>{foo}</div>}
    </>;
};
