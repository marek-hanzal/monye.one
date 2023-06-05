"use client";

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
            onClick={async () => startTransition(async () => setFoo("here was server action"))}
        >
            klyk
        </Button>
        {isPending ? "????" : <div>{foo}</div>}
    </>;
};
