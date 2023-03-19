import {type DefaultSession} from "next-auth";

export interface IUserSession extends Pick<DefaultSession, "user"> {
    userId: string;
    tokens: string[];
}

export const $UserSession = Symbol.for("@leight/user/UserSession");
