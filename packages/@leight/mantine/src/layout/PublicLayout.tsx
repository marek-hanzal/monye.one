import {useTranslation} from "@leight/i18n-client";
import {
    Box,
    Button,
    Group,
    Header
}                       from "@mantine/core";
import {IconLogin}      from "@tabler/icons-react";
import {signIn}         from "next-auth/react";
import Image            from "next/image";
import Link             from "next/link";
import {
    type ComponentProps,
    type FC,
    type PropsWithChildren
}                       from "react";
import {
    SessionOverlay,
    useAuthenticatedSession
}                       from "../session";

export interface IPublicLayoutProps extends PropsWithChildren {
    /**
     * Where to redirect if user is already authenticated
     */
    redirect?: string;
    logo: ComponentProps<typeof Image>["src"];
}

export const PublicLayout: FC<IPublicLayoutProps> = (
    {
        redirect,
        logo,
        children
    }) => {
    const t = useTranslation("public");
    useAuthenticatedSession({redirect});
    return <>
        <SessionOverlay/>
        <Box>
            <Header height={72} px={"md"}>
                <Group position={"apart"} sx={{height: "100%"}}>
                    <Link href={"/"}>
                        <Image
                            width={200}
                            height={64}
                            alt={"logo"}
                            src={logo}
                        />
                    </Link>
                    <Group>
                        <Button
                            leftIcon={<IconLogin/>}
                            onClick={() => signIn()}
                        >
                            {t("button.sign-in")}
                        </Button>
                    </Group>
                </Group>
            </Header>
        </Box>
        {children}
    </>;
};
