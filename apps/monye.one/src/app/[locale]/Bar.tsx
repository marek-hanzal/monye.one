"use client";

import {
    DateTimeStore,
    useTranslation
} from "@leight/i18n-client";

export const Bar = () => {
    const t = useTranslation("Index");
    const {locale} = DateTimeStore.use();
    return <div>
        {t("foo")}<br/>
        locale: {locale}
    </div>;
};
