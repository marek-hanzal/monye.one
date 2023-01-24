import { type FC } from "react";
import { createUploadStore, type IUploadStore } from "./createUploadStore";
import { UploadContext } from "./UploadContext";
import { type IProviderChildren, withConsumer } from "@leight/core-client";

export interface IUploadProviderProps {
    children?: IProviderChildren<IUploadStore>;
}

export const UploadProvider: FC<IUploadProviderProps> = ({ children }) => {
    const store = createUploadStore();
    return (
        <UploadContext.Provider value={store}>
            {withConsumer(children, UploadContext)}
        </UploadContext.Provider>
    );
};
