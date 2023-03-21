import {
    defaultLocale,
    type IAvailableLocales,
    type IDayjs,
    locales
}                   from "@leight/i18n";
import {setupDayjs} from "@leight/i18n-client";
import {useRouter}  from "next/router";
import {
    useEffect,
    useState
}                   from "react";

export interface IBootstrapProps {
    dayjs: { dayjs: IDayjs, locale: any };
}

const startup = async (locale: string): Promise<IBootstrapProps> => {
    const $locale = locales[locale as IAvailableLocales] || defaultLocale;
    return {
        dayjs: await setupDayjs($locale.dayjs),
    };
};

export type IUseBootstrapProps =
    {
        isLoading: boolean;
        bootstrap?: IBootstrapProps;
    }
    | {
        isLoading: false,
        bootstrap: IBootstrapProps;
    }
    | {
        isLoading: true,
        bootstrap: undefined;
    }

export const useBootstrap = (): IUseBootstrapProps => {
    const [bootstrap, setBootstrap] = useState<IBootstrapProps>();
    const router                    = useRouter();
    useEffect(() => {
        (async () => {
            setBootstrap(await startup(router.locale || router.defaultLocale || "en"));
        })();
    }, [
        router.locale,
        router.defaultLocale
    ]);
    return {
        isLoading: !bootstrap,
        bootstrap,
    };
};
