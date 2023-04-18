import {
    Calendar,
    CalendarProvider
}                      from "@leight/calendar-client";
import {DateTime}      from "@leight/i18n";
import {
    DateInline,
    DateTimeProvider,
    Translation
}                      from "@leight/i18n-client";
import {WithIcon}      from "@leight/mantine";
import {
    Box,
    Group,
    Modal,
    Stack,
    Text
}                      from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import {IconCalendar}  from "@tabler/icons-react";
import {
    ComponentProps,
    ReactNode
}                      from "react";
import {
    type IFormInputs,
    type IFormSchema
}                      from "../api";
import {Description}   from "./Description";
import {Error}         from "./Error";
import {Label}         from "./Label";

export interface IDateInputProps<TFormSchema extends IFormSchema> extends ComponentProps<typeof Box>, IFormInputs.IInputProps<TFormSchema> {
    label?: string;
    description?: string;
    placeholder?: ReactNode;
    withAsterisk?: boolean;
}

export const DateInput = <TFormSchema extends IFormSchema>(
    {
        FormContext,
        path,
        label,
        description,
        placeholder,
        withAsterisk,
        ...props
    }: IDateInputProps<TFormSchema>) => {
    const [opened, {open, close}]                             = useDisclosure(false);
    const {MantineContext: {useFormContext}, withTranslation} = FormContext.useState(({MantineContext, withTranslation}) => ({MantineContext, withTranslation}));
    const {onChange, value, error}                            = useFormContext().getInputProps(path);
    return <Box
        mt={"md"}
        {...props}
    >
        <DateTimeProvider>
            <Modal
                opened={opened}
                onClose={close}
                zIndex={501}
                size={"50%"}
                title={<Label
                    withTranslation={withTranslation}
                    label={label}
                    withAsterisk={withAsterisk}
                />}
            >

                <CalendarProvider
                    date={value ? DateTime.fromISO(value) : undefined}
                >
                    <Description withTranslation={withTranslation} description={description}/>
                    <Calendar
                        onClick={({day}) => {
                            onChange(day.day.toISODate());
                            close();
                        }}
                    />
                </CalendarProvider>
            </Modal>

            <Stack
                spacing={"sm"}
            >
                <Stack spacing={1}>
                    <Label withTranslation={withTranslation} withAsterisk={withAsterisk} label={label}/>
                    <Description withTranslation={withTranslation} description={description}/>
                </Stack>
                <Group
                    onClick={() => open()}
                    sx={{cursor: "pointer"}}
                    align={"center"}
                    spacing={4}
                >
                    <WithIcon
                        variant={"subtle"}
                        c={"gray"}
                        icon={<IconCalendar/>}
                    />
                    <Stack
                        spacing={0}
                    >
                        <Text
                            fw={"500"}
                        >
                            {value ? <DateInline
                                date={value}
                                options={{day: "numeric", month: "long", year: "numeric"}}
                            /> : <Text
                                c={"dimmed"}
                            >
                                <Translation {...withTranslation} label={`${withTranslation.label}.${placeholder}`}/>
                            </Text>}
                        </Text>
                        <Error error={error}/>
                    </Stack>
                </Group>
            </Stack>
        </DateTimeProvider>
    </Box>;
};
