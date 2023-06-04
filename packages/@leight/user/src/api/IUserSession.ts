import {
    type IContainer,
    ServiceContext
}                            from "@leight/container";
import {type DefaultSession} from "next-auth";

export interface IUserSession extends Pick<DefaultSession, "user"> {
    userId: string;
    tokens: string[];
}

export const $UserSession = Symbol.for("@leight/user/UserSession");
export const withUserSession = (container: IContainer) => new ServiceContext<IUserSession>(container, $UserSession).resolve();
