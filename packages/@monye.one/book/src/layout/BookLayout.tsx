import {Box, Group, Header} from "@mantine/core";
import {PrimaryButton, SessionOverlay, useUnauthenticatedRedirect,} from "@monye.one/ui";
import {signOut} from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import {ComponentProps, type FC, type PropsWithChildren} from "react";
import {BookMenu} from "./BookMenu";

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
                        <Link href={"/"}>
                            <Image
                                width={96}
                                height={138}
                                src={logo}
                                className="mr-3 h-6 sm:h-9"
                                alt="logo"
                            />
                        </Link>
                        <BookMenu active={href}/>
                        <Group>
                            <PrimaryButton
                                onClick={() => signOut()}
                                withTranslation={{
                                    label: "button.sign-out",
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
