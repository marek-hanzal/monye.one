import {auth}             from "@/monye.one/auth";
import {NextAuthEndpoint} from "@leight/auth-server";

export const {
    GET,
    POST
} = NextAuthEndpoint({options: auth});
