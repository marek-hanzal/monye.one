import { type FC } from "react";
import { createLoopStore, type ILoopStoreContext } from "./createLoopStore";
import { LoopContext } from "./LoopContext";
import { type IProviderChildren } from "../api";
import { withConsumer } from "../withConsumer";

export interface ILoopProviderProps {
    children?: IProviderChildren<ILoopStoreContext>;
}

export const LoopProvider: FC<ILoopProviderProps> = ({ children }) => {
    const store = createLoopStore();
    return (
        <LoopContext.Provider value={{ state: store.getState(), store }}>
            {withConsumer(children, LoopContext)}
        </LoopContext.Provider>
    );
};
