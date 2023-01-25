import { createContext as coolCreateContext } from "react";

export const createContext = <T>() => {
    return coolCreateContext<T | null>(null);
};
