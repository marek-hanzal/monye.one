import coolDayjs       from "dayjs";
import duration        from "dayjs/plugin/duration";
import localeData      from "dayjs/plugin/localeData";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime    from "dayjs/plugin/relativeTime";
import utc             from "dayjs/plugin/utc";

export const setupDayjs = async (locale: string) => {
    coolDayjs.extend(duration);
    coolDayjs.extend(localeData);
    coolDayjs.extend(localizedFormat);
    coolDayjs.extend(relativeTime);
    coolDayjs.extend(utc);

    const $locale = await import(`dayjs/locale/${locale}.js`);
    coolDayjs.locale($locale);

    return {
        dayjs:  coolDayjs,
        locale: $locale,
    };
};
