import logo from "@/monye.one/assets/logo/logo.svg";
import { withTranslation } from "@leight/i18n-server";
import { withBookLayout } from "@monye.one/book";

export default withBookLayout(
    () => {
        return <h1>Filters here!!</h1>;
    },
    { logo, href: "/book/filters" }
);

export const getServerSideProps = withTranslation(["common", "book", "filter"]);
