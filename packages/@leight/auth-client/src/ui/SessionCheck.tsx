import {
    type AuthOptions,
    getServerSession
}                from "next-auth";
import {type FC} from "react";

export interface ISessionCheckProps {
    auth: AuthOptions;
    redirect?: string;
}

export const SessionCheck: FC<ISessionCheckProps> = async (
    {
        auth,
        redirect,
    }) => {
    const session = await getServerSession(auth);
    console.log("Session", session);
    // if (redirect && session?.status === "authenticated") {
    //     await router.push(redirect);
    // }
    return null;
};
