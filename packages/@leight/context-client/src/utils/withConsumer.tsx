import {isCallable}                  from "@leight/utils";
import {type Context as CoolContext} from "react";
import {
    type IContextRender,
    type IProviderChildren
}                                    from "../api";

/**
 * Render consumer of a context if callback is provided in children.
 */
export const withConsumer = <
    TChildren,
    TContext extends CoolContext<TChildren | null>
>(
    children: IProviderChildren<TChildren>,
    Context: TContext
) => {
    return isCallable<IContextRender<TChildren>>(children) ? (
        <Context.Consumer>
            {(context) => {
                if (!context) {
                    throw new Error(
                        `There is no [${Context.displayName}] context provider.`
                    );
                }
                return children(context);
            }}
        </Context.Consumer>
    ) : (
        children
    );
};
