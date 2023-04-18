import {
    DateTime,
    DateTimeFormatOptions
}                    from "@leight/i18n";
import {DateInline}  from "@leight/i18n-client";
import {Breadcrumbs} from "@mantine/core";
import {
    type ComponentProps,
    type FC
}                    from "react";

export interface IDateRageInlineProps extends Omit<ComponentProps<typeof Breadcrumbs>, "children"> {
    start: DateTime;
    end: DateTime;
    startOptions?: DateTimeFormatOptions;
    endOptions?: DateTimeFormatOptions;
}

export const DateRageInline: FC<IDateRageInlineProps> = (
    {
        start,
        end,
        startOptions = {day: "numeric", month: "numeric"},
        endOptions,
        ...props
    }) => {
    return <Breadcrumbs
        separator={"→"}
        className={"secondary"}
        {...props}
    >
        <DateInline
            date={start}
            options={startOptions}
        />
        <DateInline
            date={end}
            options={endOptions}
        />
    </Breadcrumbs>;
};
