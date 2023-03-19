import {type IDayjsInput} from "@leight/i18n";
import {FC}               from "react";
import {useDayjsState}    from "../context";

export interface IDateProps {
    input: IDayjsInput | null;
    fallback?: string;
}

export const Date: FC<IDateProps> = ({input, fallback}) => {
    const {toLocalDate} = useDayjsState(({toLocalDate}) => ({toLocalDate}));
    return <>
        {toLocalDate(input, fallback)}
    </>;
};
