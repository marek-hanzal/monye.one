import {type IDayjsInput} from "@leight/i18n";
import {FC}               from "react";
import {useDayjsState}    from "../context";

export interface IDateTimeProps {
    input: IDayjsInput | null;
    fallback?: string;
}

export const DateTime: FC<IDateTimeProps> = ({input, fallback}) => {
    const {toLocalDateTime} = useDayjsState(({toLocalDateTime}) => ({toLocalDateTime}));
    return <>
        {toLocalDateTime(input, fallback)}
    </>;
};
