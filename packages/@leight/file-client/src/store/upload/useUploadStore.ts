import { UploadContext } from "./UploadContext";
import { useStore } from "zustand";
import { useContext } from "@leight/core-client";

export const useUploadStore = () => {
    const store = useContext(
        UploadContext,
        "UploadContext",
        "Add UploadProvider."
    );
    return useStore(store);
};
