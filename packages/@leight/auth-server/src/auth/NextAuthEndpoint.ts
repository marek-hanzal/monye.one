import NextAuthShit, {type NextAuthOptions} from "next-auth";

export type INextAuthEndpointProps = {
    options: NextAuthOptions;
};

export const NextAuthEndpoint = (
    {
        options,
    }: INextAuthEndpointProps) => {
    /**
     * For whatever reason, types are not what you really get, so the hack must be used.
     */
    const NextAuth = (NextAuthShit as any).default as typeof NextAuthShit;

    return NextAuth(options);
};
