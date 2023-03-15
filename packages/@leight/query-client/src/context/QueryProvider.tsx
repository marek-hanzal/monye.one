import {CursorProvider} from "@leight/cursor-client";
import {
    type FC,
    type PropsWithChildren
}                       from "react";

export type IQueryProviderInternalProps = PropsWithChildren;
export type IQueryProviderProps = IQueryProviderInternalProps;

export const QueryProvider: FC<IQueryProviderInternalProps> = ({children}) => {
    return <CursorProvider>
        {children}
    </CursorProvider>;
};
