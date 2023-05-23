"use client";

import {
    DateTimeStore,
    useTranslation
} from "@leight/viv-client";

export const Bar = () => {
    const t = useTranslation("Index");
    const {locale} = DateTimeStore.useState();
    return <div>
        {t("foo")}<br/>
        locale: {locale}
    </div>;
};
