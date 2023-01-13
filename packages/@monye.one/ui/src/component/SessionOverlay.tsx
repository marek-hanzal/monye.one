import {LoadingOverlay} from "@mantine/core";
import {useSession}     from "next-auth/react";
import {
    ComponentProps,
    FC
}                       from "react";

export interface ISessionOverlayProps extends Partial<ComponentProps<typeof LoadingOverlay>> {
}

export const SessionOverlay: FC<ISessionOverlayProps> = ({...props}) => {
    const session = useSession();
    return <LoadingOverlay
        visible={session.status === "loading"}
        overlayBlur={4}
        transitionDuration={750}
        {...props}
    />;
};
