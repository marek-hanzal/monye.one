export async function Foo() {
    const foo = await new Promise(resolve => setTimeout(() => resolve("bar"), 1500));
    return <>{foo}</>;
}
