import { emotionCache } from "@/monye.one/emotion-cache";
import {
    createGetInitialProps,
    createStylesServer,
    ServerStyles,
} from "@mantine/next";
import type { DocumentContext } from "next/document";
import Document from "next/document";

const getInitialProps = createGetInitialProps();
const stylesServer = createStylesServer(emotionCache);

// eslint-disable-next-line import/no-anonymous-default-export
export default class extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const props = await getInitialProps(ctx);
        return {
            ...props,
            styles: (
                <>
                    {props.styles}
                    <ServerStyles html={props.html} server={stylesServer} />
                </>
            ),
        };
    }
}
