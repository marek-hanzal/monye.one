import logo              from "@/monye.one/assets/logo/logo.svg";
import {withTranslation} from "@leight/i18n-server";
import {withBookLayout}  from "@monye.one/book";

export default withBookLayout(() => {
    return (
        <h1>Book here!!</h1>
    );
}, {logo, href: "/book"});

export const getServerSideProps = withTranslation([
    "common",
    "book"
]);
