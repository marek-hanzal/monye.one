import {Some} from "@/monye.one/app/[locale]/Some";

export async function Foo() {
    const bar = await new Promise(resolve => setTimeout(() => resolve("bar"), 1500));
    return <>
        {bar}
        <Some/>
    </>;
}
