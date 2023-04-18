import {type IWithTranslation} from "@leight/i18n";
import {Translation}           from "@leight/i18n-client";
import {type ILink}            from "@leight/utils-client";
import {
    createStyles,
    Group
}                              from "@mantine/core";
import Link                    from "next/link";
import {useRouter}             from "next/router";
import {
    switchScheme,
    withPrimaryColor
}                              from "../utils";
import {WithIcon}              from "./WithIcon";

const useStyles = createStyles((theme) => ({
    link:       {
        display:        "flex",
        alignItems:     "center",
        height:         "50%",
        margin:         theme.spacing.xs,
        paddingLeft:    theme.spacing.md,
        paddingRight:   theme.spacing.md,
        textDecoration: "none",
        fontWeight:     500,
        fontSize:       theme.fontSizes.md,
        color:          switchScheme(theme, theme.white, theme.black),
        "&:hover":      {
            borderBottom:      "1px solid",
            borderBottomColor: switchScheme(
                theme,
                theme.colors.dark[4],
                withPrimaryColor(theme),
            ),
        },
    },
    linkActive: {
        "&, &:hover": {
            fontWeight:        "bold",
            borderBottom:      "2px solid",
            borderBottomColor: switchScheme(
                theme,
                theme.colors.dark[4],
                withPrimaryColor(theme),
            ),
        },
    },
}));

export type IMainMenuLinks = Record<string, ILink>;

export interface IMainMenuProps<TLinks extends IMainMenuLinks> {
    withTranslation?: IWithTranslation;
    links: TLinks;
    active?: keyof TLinks;
}

export const MainMenu = <TLinks extends IMainMenuLinks>(
    {
        links,
        active,
        withTranslation,
    }: IMainMenuProps<TLinks>) => {
    const router        = useRouter();
    const {classes, cx} = useStyles();
    const $active       = (active || router.pathname) as string;
    return <Group
        sx={{height: "100%"}}
        spacing={0}
    >
        {Object.entries(links).map(([id, link]) => (
            <Link
                key={id}
                href={link.href}
                className={cx(classes.link, {
                    [classes.linkActive]: $active.includes(link.href),
                })}
            >
                <Group
                    position={"apart"}
                >
                    <WithIcon
                        icon={link.icon}
                    />
                    <Translation
                        {...withTranslation}
                        label={link.label || id}
                    />
                </Group>
            </Link>
        ))}
    </Group>;
};
