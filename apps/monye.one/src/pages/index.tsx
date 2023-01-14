import logo               from "@/monye.one/assets/logo/logo.svg";
import {withTranslation}  from "@leight/i18n-server";
import {withPublicLayout} from "@monye.one/public";

export default withPublicLayout(() => {
    return (
        <h1>Bello!</h1>
    );
}, {logo});

export const getServerSideProps = withTranslation([
    "common",
    "public"
]);
