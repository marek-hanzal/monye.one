import { createContext } from "react";
import { type IUploadStore } from "./createUploadStore";

export const UploadContext = createContext<IUploadStore | null>(null);
