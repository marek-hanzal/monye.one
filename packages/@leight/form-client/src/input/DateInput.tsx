import {
    Calendar,
    CalendarProvider
}                      from "@leight/calendar-client";
import {
    type IFormInputs,
    type IFormSchemaType
}                      from "@leight/form";
import {DateTime}      from "@leight/i18n";
import {
    DateInline,
    DateTimeProvider
}                      from "@leight/i18n-client";
import {
    Box,
    Modal
}                      from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import {IconCalendar}  from "@tabler/icons-react";
import {
    type ComponentProps,
    type ReactNode
}                      from "react";
import {Description}   from "./Description";
import {InputEx}       from "./InputEx";
import {Label}         from "./Label";

export interface IDateInputProps<TFormSchemaType extends IFormSchemaType> extends Omit<ComponentProps<typeof Box<"div">>, "placeholder">, IFormInputs.IInputProps<TFormSchemaType> {
    label?: string;
    description?: string;
    placeholder?: ReactNode;
    withAsterisk?: boolean;
}

export const DateInput = <TFormSchemaType extends IFormSchemaType>(props: IDateInputProps<TFormSchemaType>) => {
    const [opened, {open, close}]                             = useDisclosure(false);
    const {MantineContext: {useFormContext}, withTranslation} = props.FormContext.useState(({MantineContext, withTranslation}) => ({MantineContext, withTranslation}));
    const {onChange, value}                                   = useFormContext().getInputProps(props.path);
    return <DateTimeProvider>
        <Modal
            opened={opened}
            onClose={close}
            zIndex={501}
            size={"50%"}
            title={<Label
                withTranslation={withTranslation}
                label={props.label}
                withAsterisk={props.withAsterisk}
            />}
        >
            <CalendarProvider
                date={value ? DateTime.fromISO(value) : undefined}
            >
                <Description withTranslation={withTranslation} description={props.description}/>
                <Calendar
                    onClick={({day}) => {
                        onChange(day.day.toISODate());
                        close();
                    }}
                />
            </CalendarProvider>
        </Modal>

        <InputEx
            icon={<IconCalendar/>}
            onClick={open}
            {...props}
        >
            {value ? <DateInline
                date={value}
                options={{day: "numeric", month: "long", year: "numeric"}}
            /> : null}
        </InputEx>
    </DateTimeProvider>;
};
