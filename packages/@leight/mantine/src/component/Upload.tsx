import {
    type IUseUploadProps,
    useUpload
}                 from "@leight/file-client";
import {Progress} from "@mantine/core";
import {type FC}  from "react";

export interface IUploadProps {
    /**
     * Upload is an object because it does not mess up all the props in this component.
     */
    upload: IUseUploadProps;
}

/**
 * This component executes upload just as it's got rendered.
 */
export const Upload: FC<IUploadProps> = ({upload}) => {
    const {isRunning, isSuccess, isError, percent} = useUpload(upload);
    return <Progress
        color={
            isError
                ? "red"
                : isRunning
                    ? "blue"
                    : isSuccess
                        ? "green"
                        : undefined
        }
        radius={"md"}
        size={"md"}
        value={percent()}
        animate={isRunning}
    />;
};
