import {Translation}  from "@leight/i18n-client";
import {switchScheme} from "@leight/mantine";
import {type ILink}   from "@leight/ui";
import {
    createStyles,
    Group
}                     from "@mantine/core";
import Link           from "next/link";
import {type FC}      from "react";

export interface IBookMenuProps {
    active: string;
}

const links: ILink[] = [
    {
        href:  "/book",
        label: "link.home",
    },
    {
        href:  "/book/transactions",
        label: "link.transactions",
    },
    {
        href:  "/book/filters",
        label: "link.filters",
    },
    {
        href:  "/book/accounts",
        label: "link.accounts",
    },
];

const useStyles = createStyles(theme => ({
    link: {
        display:        "flex",
        alignItems:     "center",
        height:         "50%",
        margin:         theme.spacing.xs,
        borderRadius:   theme.radius.md,
        paddingLeft:    theme.spacing.md,
        paddingRight:   theme.spacing.md,
        textDecoration: "none",
        fontWeight:     500,
        fontSize:       theme.fontSizes.sm,
        color:          switchScheme(theme, theme.white, theme.black),
        ...theme.fn.hover({
            backgroundColor: switchScheme(theme, theme.colors.dark[6], theme.colors.red[0]),
        }),
    },
    linkActive: {
        "&, &:hover": {
            backgroundColor: switchScheme(theme, theme.colors.dark[4], theme.colors.red[2]),
        }
    }
}));

export const BookMenu: FC<IBookMenuProps> = ({active}) => {
    const {classes, cx} = useStyles();
    return <Group
        sx={{height: "100%"}}
        spacing={0}
    >
        {links.map(link => (
            <Link
                key={link.href}
                href={link.href}
                className={cx(classes.link, {[classes.linkActive]: active === link.href})}
            >
                <Translation namespace={"book"} label={link.label}/>
            </Link>
        ))}
    </Group>;
};
