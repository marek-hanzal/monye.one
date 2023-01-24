import { type FC } from "react";
import { Progress } from "@mantine/core";
import { type IUseUploadProps, useUpload } from "@leight/file-client";

export interface IUploadProps {
    /**
     * Upload is an object because it does not mess up all the props in this component.
     */
    upload: IUseUploadProps;
}

/**
 * This component executes upload just as it's got rendered.
 */
export const Upload: FC<IUploadProps> = ({ upload }) => {
    const { percent, error, running, idle } = useUpload(upload);

    return (
        <>
            <Progress
                color={error ? "red" : running || idle ? "blue" : "green"}
                radius={"md"}
                size={"md"}
                value={percent}
                animate={running}
            />
        </>
    );
};
