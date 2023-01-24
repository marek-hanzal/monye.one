import { createStore } from "zustand";

export interface IUploadStoreProps {}

export const createUploadStore = () => {
    return createStore<IUploadStoreProps>((set) => ({}));
};

export type IUploadStore = ReturnType<typeof createUploadStore>;
