"use client";

import {useTranslations} from "next-intl";

export const Bar = () => {
    const t = useTranslations("Index");
    return <div>{t("foo")}</div>;
};
