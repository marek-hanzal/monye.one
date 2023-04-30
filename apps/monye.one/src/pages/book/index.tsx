import logo                from "@/monye.one/assets/logo/logo.svg";
import {withTranslation}   from "@leight/i18n-server";
import {Button}            from "@mantine/core";
import {withBookLayout}    from "@monye.one/book-client";
import {FilterSourceStore} from "@monye.one/filter-client";

export default withBookLayout(
    function Index() {
        const foo = FilterSourceStore.use.useCreate();

        return <>
            <Button
                onClick={() => {
                    foo.mutate({
                        name:   "foo",
                        type:   "transaction",
                        filter: {
                            bla: "1",
                            ble: 2,
                        },
                        dto:    {
                            ahoj: "nazdar",
                        },
                    });
                    foo.mutate({
                        name:   "foo2",
                        type:   "transaction",
                        filter: {
                            bla: "23",
                            ble: 3,
                        },
                    });
                }}
            >
                klyk
            </Button>
        </>;
    },
    {logo, href: "/book"}
);

export const getServerSideProps = withTranslation([
    "common",
    "bank",
    "book",
]);
