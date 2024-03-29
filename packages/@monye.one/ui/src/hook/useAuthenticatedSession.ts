import {useSession} from "next-auth/react";
import {useRouter}  from "next/router";
import {useEffect}  from "react";

export interface IUseAuthenticatedSessionProps {
    redirect: string;
}

export const useAuthenticatedSession = ({
                                            redirect,
                                        }: IUseAuthenticatedSessionProps) => {
    const session = useSession();
    const router  = useRouter();
    useEffect(() => {
        (async () => {
            if (session.status === "authenticated") {
                await router.push(redirect);
            }
        })();
    }, [session.status]);
    return session;
};
