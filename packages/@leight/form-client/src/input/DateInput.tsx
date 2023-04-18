import {
    Calendar,
    CalendarProvider
}                  from "@leight/calendar-client";
import {DateTime}  from "@leight/i18n";
import {
    DateTimeProvider,
    Translation
}                  from "@leight/i18n-client";
import {
    Box,
    Text
}                  from "@mantine/core";
import {ReactNode} from "react";
import {
    type IFormInputs,
    type IFormSchema
}                  from "../api";

export interface IDateInputProps<TFormSchema extends IFormSchema> extends IFormInputs.IInputProps<TFormSchema> {
    label?: ReactNode;
    description?: ReactNode;
    withAsterisk?: boolean;
}

export const DateInput = <TFormSchema extends IFormSchema>(
    {
        FormContext,
        path,
        label,
        description,
        withAsterisk,
    }: IDateInputProps<TFormSchema>) => {
    const {MantineContext: {useFormContext}, withTranslation} = FormContext.useState(({MantineContext, withTranslation}) => ({MantineContext, withTranslation}));
    const {onChange, value, error}                            = useFormContext().getInputProps(path);
    return <Box
        mt={"md"}
    >
        <DateTimeProvider>
            <CalendarProvider
                date={value ? DateTime.fromISO(value) : undefined}
            >
                <Text
                    fw={"500"}
                    span
                >
                    <Translation {...withTranslation} label={`${withTranslation.label}.${label}`}/>
                </Text>
                {withAsterisk && <Text ml={4} c={"red"} span>*</Text>}
                <Text
                    c={"dimmed"}
                >
                    <Translation {...withTranslation} label={`${withTranslation.label}.${description}`}/>
                </Text>
                {error && <Text c={"red"}>{error}</Text>}
                <Calendar
                    compact
                    onClick={({day}) => onChange(day.day.toISODate())}
                />
            </CalendarProvider>
        </DateTimeProvider>
    </Box>;
};
