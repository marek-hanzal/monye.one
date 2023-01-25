import { compile } from "path-to-regexp";
import { type IHrefProps, type IHrefQuery } from "@leight/utils";

export const toHref = <TQuery extends IHrefQuery = IHrefQuery>({
    href,
    query,
}: IHrefProps<TQuery>): string => {
    return href === "/"
        ? href
        : compile(href.replace(/\[(.*?)\]/g, ":$1").replace(/{(.*?)}/g, ":$1"))(
              query || {}
          );
};
