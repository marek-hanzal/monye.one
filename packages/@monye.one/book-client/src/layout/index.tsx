import {type IPageWithLayout} from "@leight/layout";
import {
    Box,
    Group,
    Header
}                             from "@mantine/core";
import {
    PrimaryButton,
    SessionOverlay,
    useUnauthenticatedRedirect,
}                             from "@monye.one/ui";
import {IconLogout}           from "@tabler/icons-react";
import {signOut}              from "next-auth/react";
import Image                  from "next/image";
import Link                   from "next/link";
import {
    type ComponentProps,
    type FC,
    type PropsWithChildren
}                             from "react";
import {BookMenu}             from "../menu";

export interface IBookLayoutProps extends PropsWithChildren {
    logo: ComponentProps<typeof Image>["src"];
    href: string;
}

export const BookLayout: FC<IBookLayoutProps> = ({logo, href, children}) => {
    useUnauthenticatedRedirect();
    return (
        <>
            <SessionOverlay/>
            <Box>
                <Header height={72} px={"md"}>
                    <Group position={"apart"} sx={{height: "100%"}}>
                        <Link href={"/book"}>
                            <Image
                                width={200}
                                height={64}
                                src={logo}
                                alt={"logo"}
                            />
                        </Link>
                        <BookMenu active={href}/>
                        <Group>
                            <PrimaryButton
                                size={"sm"}
                                variant={"outline"}
                                onClick={() => signOut()}
                                rightIcon={<IconLogout/>}
                                withTranslation={{
                                    label:     "button.sign-out",
                                    namespace: "book",
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

export function withBookLayout(Component: FC, props: IBookLayoutProps) {
    // eslint-disable-next-line no-param-reassign
    (Component as unknown as IPageWithLayout).layout = (children) => {
        return <BookLayout {...props}>{children}</BookLayout>;
    };
    return Component;
}
