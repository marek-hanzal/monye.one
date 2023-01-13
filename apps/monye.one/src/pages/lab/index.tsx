import logo              from "@/monye.one/assets/logo/logo.svg";
import {withTranslation} from "@leight/i18n-server";
import {withLabLayout}   from "@monye.one/lab";

export default withLabLayout(function Index() {
    return (
        <h1>Lab here!!</h1>
    );
}, {logo});

export const getServerSideProps = withTranslation([
    "common",
    "lab"
]);
