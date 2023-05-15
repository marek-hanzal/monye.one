import {type IPageWithLayout} from "@leight/layout";
import {
    Box,
    Group,
    Header
}                             from "@mantine/core";
import {
    PrimaryButton,
    SessionOverlay,
    useAuthenticatedSession,
}                             from "@monye.one/ui";
import {IconLogin}            from "@tabler/icons-react";
import {signIn}               from "next-auth/react";
import Image                  from "next/image";
import Link                   from "next/link";
import {
    type ComponentProps,
    type FC,
    type PropsWithChildren
}                             from "react";

export interface IPublicLayoutProps extends PropsWithChildren {
    logo: ComponentProps<typeof Image>["src"];
}

export const PublicLayout: FC<IPublicLayoutProps> = ({logo, children}) => {
    useAuthenticatedSession({redirect: "/book"});
    return (
        <>
            <SessionOverlay/>
            <Box>
                <Header height={72} px={"md"}>
                    <Group position={"apart"} sx={{height: "100%"}}>
                        <Link href={"/"}>
                            <Image
                                width={200}
                                height={64}
                                src={logo}
                                alt={"logo"}
                            />
                        </Link>
                        <Group>
                            <PrimaryButton
                                leftIcon={<IconLogin/>}
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
