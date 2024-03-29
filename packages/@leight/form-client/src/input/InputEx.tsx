import {
    type IFormInputs,
    type IFormSchemaType
}                    from "@leight/form";
import {Translation} from "@leight/i18n-client";
import {WithIcon}    from "@leight/mantine";
import {
    ActionIcon,
    Box,
    Grid,
    Group,
    Loader,
    Stack,
    Text
}                    from "@mantine/core";
import {
    IconClick,
    IconX
}                    from "@tabler/icons-react";
import {
    type ComponentProps,
    type ReactNode
}                    from "react";
import {Description} from "./Description";
import {Error}       from "./Error";
import {Label}       from "./Label";

export interface IInputExProps<TFormSchemaType extends IFormSchemaType> extends Omit<ComponentProps<typeof Box<"div">>, "placeholder" | "onClick">, IFormInputs.IInputProps<TFormSchemaType> {
    icon?: ReactNode;
    label?: string;
    description?: string;
    placeholder?: ReactNode;
    withAsterisk?: boolean;
    isLoading?: boolean;
    onClick?: ComponentProps<typeof Group>["onClick"];

    onClear?(): void;
}

export const InputEx = <TFormSchemaType extends IFormSchemaType>(
    {
        icon = <IconClick/>,
        FormContext,
        path,
        withAsterisk,
        label,
        description,
        placeholder,
        children,
        isLoading = false,
        onClick,
        onClear,
        ...props
    }: IInputExProps<TFormSchemaType>
) => {
    const {MantineContext: {useFormContext}, withTranslation} = FormContext.useState(({MantineContext, withTranslation}) => ({MantineContext, withTranslation}));
    const {onChange, error}                                   = useFormContext().getInputProps(path);
    return <Box
        mt={"md"}
        {...props}
    >
        <Stack
            spacing={"sm"}
        >
            <Stack spacing={1}>
                <Label withTranslation={withTranslation} withAsterisk={withAsterisk} label={label}/>
                <Description withTranslation={withTranslation} description={description}/>
            </Stack>
            <Grid
                onClick={onClick}
                sx={onClick ? {cursor: "pointer"} : undefined}
                align={"center"}
            >
                <Grid.Col
                    span={"content"}
                >
                    <WithIcon
                        variant={"subtle"}
                        c={"gray"}
                        icon={icon}
                    />
                </Grid.Col>
                <Grid.Col
                    span={"auto"}
                >
                    <Stack
                        spacing={0}
                    >
                        <Text
                            fw={"500"}
                        >
                            {isLoading ? <Loader variant={"dots"}/> : (children || <Text
                                c={"dimmed"}
                            >
                                <Translation {...withTranslation} withLabel={placeholder}/>
                            </Text>)}
                        </Text>
                        <Error error={error}/>
                    </Stack>
                </Grid.Col>
                {children ? <Grid.Col
                    span={"content"}
                >
                    <ActionIcon
                        onClick={e => {
                            e.stopPropagation();
                            onClear?.();
                            onChange(undefined);
                        }}
                    >
                        <IconX/>
                    </ActionIcon>
                </Grid.Col> : null}
            </Grid>
        </Stack>
    </Box>;
};
