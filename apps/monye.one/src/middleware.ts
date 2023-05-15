import {
    defaultLocale,
    locales
}                       from "@/monye.one/locales";
import createMiddleware from "next-intl/middleware";

export default createMiddleware({
    locales,
    defaultLocale,
});

export const config = {
    matcher: ["/((?!api|_next|.*\\..*).*)"]
};
