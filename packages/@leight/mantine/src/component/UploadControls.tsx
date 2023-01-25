import { type FC } from "react";
import { useLoopStore } from "@leight/utils-client";

export interface IUploadControlsProps {}

export const UploadControls: FC<IUploadControlsProps> = () => {
    const { isRunning } = useLoopStore();
    return <>{isRunning ? "actions" : "done"}</>;
};
