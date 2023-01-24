import { createContext } from "react";
import { type ILoopStoreContext } from "./createLoopStore";

export const LoopContext = createContext<ILoopStoreContext | null>(null);
