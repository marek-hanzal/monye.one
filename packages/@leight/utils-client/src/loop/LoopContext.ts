import { createContext } from "@leight/context-client";
import { type IStoreContext } from "@leight/zustand";
import { type StoreApi } from "zustand";
import { type ILoopStoreProps } from "./createLoopStore";

export interface ILoopStoreContext
    extends IStoreContext<StoreApi<ILoopStoreProps>> {}

export const LoopContext = createContext<ILoopStoreContext>();
