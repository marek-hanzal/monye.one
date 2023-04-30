import logo              from "@/monye.one/assets/logo/logo.svg";
import {withTranslation} from "@leight/i18n-server";
import {withBookLayout}  from "@monye.one/book-client";

export default withBookLayout(
    function Index() {
        return null;
    },
    {logo, href: "/book"}
);

export const getServerSideProps = withTranslation([
    "common",
    "bank",
    "book",
]);
