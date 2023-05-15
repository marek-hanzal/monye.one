import logo               from "@/monye.one/assets/logo/logo.svg";
import {withTranslation}  from "@leight/i18n-server";
import {withPublicLayout} from "@monye.one/public-client";

export default withPublicLayout(
    function Index() {
        return null;
    },
    {logo}
);

export const getServerSideProps = withTranslation([
    "common",
    "public"
]);
