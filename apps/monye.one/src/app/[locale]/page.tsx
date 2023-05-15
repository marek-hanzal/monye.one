import {Bar} from "@/monye.one/app/[locale]/Bar";
import {Foo} from "@/monye.one/app/[locale]/Foo";

export default function Index() {
    return <>
        <h1>hello from locale</h1>
        <Bar/>
        {/* @ts-expect-error Async Server Component */}
        <Foo/>
    </>;
}
