import {type IWithTranslation} from "@leight/i18n";
import {Translation}           from "@leight/i18n-client";
import {type IHrefProps}       from "@leight/utils";
import {toHref}                from "@leight/utils-client";
import {Tabs}                  from "@mantine/core";
import {useRouter}             from "next/router";
import {
    type FC,
    type ReactNode
}                              from "react";

export interface ITabLinkMenuItem {
    href: IHrefProps;
    icon?: ReactNode;
    withTranslation?: IWithTranslation;
}

export interface ITabLinkMenuProps {
    items: ITabLinkMenuItem[];
    active?: string;
}

export const TabLinkMenu: FC<ITabLinkMenuProps> = ({active, items}) => {
    const router = useRouter();
    return (
        <Tabs
            defaultValue={active || router.pathname}
            onTabChange={(href) => href && router.push(href)}
        >
            <Tabs.List>
                {items.map(({icon, href, withTranslation}) => (
                    <Tabs.Tab icon={icon} key={href.href} value={toHref(href)}>
                        {withTranslation && (
                            <Translation {...withTranslation} />
                        )}
                    </Tabs.Tab>
                ))}
            </Tabs.List>
        </Tabs>
    );
};
