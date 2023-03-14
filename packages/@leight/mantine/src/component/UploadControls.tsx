import {useLoopState} from "@leight/utils-client";
import {type FC}      from "react";

export interface IUploadControlsProps {
}

export const UploadControls: FC<IUploadControlsProps> = () => {
    const {isRunning} = useLoopState();
    return <>{isRunning ? "actions" : "done"}</>;
};
