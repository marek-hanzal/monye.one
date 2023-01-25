import { Endpoint, IEndpointFactory } from "@leight/next.js-server";

export const XlsxImportEndpoint: IEndpointFactory<string> = (
    target,
    withTokens
) => {
    return Endpoint({
        container: target,
        withTokens: withTokens || ["user"],
        async handler() {
            return "ok";
        },
    });
};
