import logo from "@/monye.one/assets/logo/logo.svg";
import {withTranslation} from "@leight/i18n-server";
import {withBookLayout} from "@monye.one/book";
import {trpc} from "@monye.one/trpc-client";

export default withBookLayout(
    function Index() {
        const query = trpc.transaction.source.query.useQuery();
        console.log(query.data);
        return <h1>Book here!!</h1>;
    },
    {logo, href: "/book"}
);

export const getServerSideProps = withTranslation(["common", "book"]);
