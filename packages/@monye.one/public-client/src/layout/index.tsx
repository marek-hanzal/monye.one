import {type IPageWithLayout} from "@leight/layout";
import {switchScheme}         from "@leight/mantine";
import {
    Box,
    createStyles,
    Group,
    Header
}                             from "@mantine/core";
import {
    PrimaryButton,
    SessionOverlay,
    useAuthenticatedSession,
}                             from "@monye.one/ui";
import {signIn}               from "next-auth/react";
import {useTranslation}       from "next-i18next";
import Image                  from "next/image";
import Link                   from "next/link";
import {
    type ComponentProps,
    type FC,
    type PropsWithChildren
}                             from "react";

const useStyles = createStyles((theme) => ({
    link: {
        display:        "flex",
        alignItems:     "center",
        height:         "75%",
        borderRadius:   theme.radius.md,
        paddingLeft:    theme.spacing.md,
        paddingRight:   theme.spacing.md,
        textDecoration: "none",
        fontWeight:     500,
        fontSize:       theme.fontSizes.sm,
        color:          switchScheme(theme, theme.white, theme.black),
        ...theme.fn.hover({
            backgroundColor: switchScheme(
                theme,
                theme.colors.dark[6],
                theme.colors.red[0]
            ),
        }),
    },
}));

export interface IPublicLayoutProps extends PropsWithChildren {
    logo: ComponentProps<typeof Image>["src"];
}

export const PublicLayout: FC<IPublicLayoutProps> = ({logo, children}) => {
    useAuthenticatedSession({redirect: "/book"});
    const {classes} = useStyles();
    const {t}       = useTranslation("public");
    return (
        <>
            <SessionOverlay/>
            <Box>
                <Header height={72} px={"md"}>
                    <Group position={"apart"} sx={{height: "100%"}}>
                        <Link href={"/"}>
                            <Image
                                width={138}
                                height={64}
                                src={logo}
                                className={"h-6"}
                                alt={"logo"}
                            />
                        </Link>
                        <Group sx={{height: "100%"}} spacing={0}>
                            <Link href={"/"} className={classes.link}>
                                {t("link.home")}
                            </Link>
                        </Group>
                        <Group>
                            <PrimaryButton
                                onClick={() => signIn()}
                                withTranslation={{
                                    label:     "button.sign-in",
                                    namespace: "public",
                                }}
                            />
                        </Group>
                    </Group>
                </Header>
            </Box>
            {children}
        </>
    );
};

export function withPublicLayout(Component: FC, props: IPublicLayoutProps) {
    // eslint-disable-next-line no-param-reassign
    (Component as unknown as IPageWithLayout).layout = (children) => {
        return <PublicLayout {...props}>{children}</PublicLayout>;
    };
    return Component;
}
