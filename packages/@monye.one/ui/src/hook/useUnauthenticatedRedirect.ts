import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export interface IUseUnauthenticatedRedirectProps {
    redirect?: string;
}

export const useUnauthenticatedRedirect = ({
    redirect = "/",
}: IUseUnauthenticatedRedirectProps = {}) => {
    const session = useSession();
    const router = useRouter();
    useEffect(() => {
        (async () => {
            if (session.status === "unauthenticated") {
                await router.push(redirect);
            }
        })();
    }, [session.status]);
    return session;
};
