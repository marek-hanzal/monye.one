import {type IWithTranslation}  from "@leight/i18n";
import {
    Translation,
    useTranslation
}                               from "@leight/i18n-client";
import {
    DrawerStore,
    ModalStore,
    withSuccessNotification
}                               from "@leight/mantine";
import {BlockStore}             from "@leight/utils-client";
import {
    Box,
    Button,
    Divider,
    Group,
    LoadingOverlay
}                               from "@mantine/core";
import {type UseFormReturnType} from "@mantine/form";
import {
    ComponentProps,
    type PropsWithChildren
}                               from "react";
import {
    type IFormInputsFactory,
    type IFormInputsOverrideFactory,
    type IFormMapper,
    type IFormSchema,
    type IFormSchemas,
    IFormToRequest,
    IFormToRequestWithDto,
    IFormToValues
}                               from "../api";
import {
    FormStoreProvider,
    type IFormStoreContext,
    type IMantineFormContext
}                               from "../context";
import {
    FormDtoSchema,
    FormRequestSchema,
    FormValuesSchema,
    type IFormDtoSchema,
    type IFormRequestSchema,
    type IFormValuesSchema
}                               from "../schema";

export type IWithFormSchemasProps<
    TValuesSchema extends IFormValuesSchema,
    TRequestSchema extends IFormRequestSchema,
    TDtoSchema extends IFormDtoSchema,
> = Partial<IFormSchemas<IFormSchema<TValuesSchema, TRequestSchema, TDtoSchema>>>;

export const withFormSchemas = <
    TValuesSchema extends IFormValuesSchema,
    TRequestSchema extends IFormRequestSchema,
    TDtoSchema extends IFormDtoSchema
>(
    {
        ValueSchema = FormValuesSchema as TValuesSchema,
        RequestSchema = FormRequestSchema as TRequestSchema,
        DtoSchema = FormDtoSchema as TDtoSchema,
    }: IWithFormSchemasProps<TValuesSchema, TRequestSchema, TDtoSchema>): IFormSchemas<IFormSchema<TValuesSchema, TRequestSchema, TDtoSchema>> => ({
    ValueSchema,
    RequestSchema,
    DtoSchema,
});

export type IFormProps<TFormSchema extends IFormSchema> = PropsWithChildren<{
    MantineContext: IMantineFormContext<TFormSchema>;
    schemas?: IFormSchemas<TFormSchema>;
    FormContext: IFormStoreContext<TFormSchema>;
    withTranslation: IWithTranslation;
    /**
     * Map form data (values) to request object required by a remote side
     */
    toRequest: IFormToRequest<TFormSchema>;
    /**
     * Create typed form inputs based on the Values schema
     */
    inputs: IFormInputsFactory<TFormSchema>;
    /**
     * This enables end user to replace default fields defined by a base form (for example when generated)
     */
    inputsOverride?: IFormInputsOverrideFactory<TFormSchema>;
    /**
     * Explicitly set default values; if not specified, "response" is used; defaultValues wins over "response"
     */
    defaultValues?: TFormSchema["Values"];
    onSubmit?(props: IFormProps.IOnSubmitProps<TFormSchema>): void;
    /**
     * Props passed to submit button of the form
     */
    submitProps?: ComponentProps<typeof Button>;
    /**
     * If true, onSuccess also closes drawer/modal it's in (must be modal from @leight)
     */
    withAutoClose?: boolean;
}>

export namespace IFormProps {
    export interface IOnSubmitProps<TFormSchema extends IFormSchema> {
        request: TFormSchema["Request"];

        /**
         * Calls default form submit stuff
         */
        onDefaultSubmit(): void;
    }

    export interface IInputsProps<TFormSchema extends IFormSchema> {
        schemas?: IFormSchemas<TFormSchema>;
        FormContext: IFormStoreContext<TFormSchema>;
    }
}

export const Form = <TFormSchema extends IFormSchema>(
    {
        MantineContext,
        schemas,
        FormContext,
        withTranslation,
        toRequest,
        inputs,
        inputsOverride,
        defaultValues,
        ...props
    }: IFormProps<TFormSchema>) => {
    const {FormProvider, useForm} = MantineContext;
    const {t}                     = useTranslation(withTranslation.namespace);
    const form                    = useForm({
        initialValues:   defaultValues,
        validate:        values => {
            if (!schemas?.ValueSchema) {
                return {};
            }
            const parsed = schemas.ValueSchema.safeParse(values);
            if (parsed.success) {
                return {};
            }
            const errors: Record<string, string> = {};
            parsed.error.errors.forEach(error => {
                const path   = error.path.join(".");
                errors[path] = t(`${withTranslation.label}.error.${path}.${error.message}`, withTranslation.values);
            });
            return errors;
        },
        transformValues: values => toRequest({values}),
    });
    return <FormProvider
        form={form}
    >
        <FormStoreProvider
            MantineContext={MantineContext}
            schemas={schemas}
            inputs={inputs({schemas, FormContext})}
            inputsOverride={inputsOverride?.({schemas, FormContext})}
            FormStoreContext={FormContext}
            withTranslation={withTranslation}
            defaultValues={defaultValues}
        >
            <FormInternal<TFormSchema>
                form={form}
                withTranslation={withTranslation}
                {...props}
            />
        </FormStoreProvider>
    </FormProvider>;
};

interface IFormInternalProps<TFormSchema extends IFormSchema> extends Omit<IFormProps<TFormSchema>, "FormContext" | "MantineContext" | "toRequest" | "inputs" | "inputsOverride"> {
    form: UseFormReturnType<TFormSchema["Values"], IFormMapper<TFormSchema>>;
}

const FormInternal = <TFormSchema extends IFormSchema>(
    {
        form,
        onSubmit,
        withTranslation,
        submitProps,
        withAutoClose = true,
        children,
    }: IFormInternalProps<TFormSchema>) => {
    const {isBlock} = BlockStore.useOptionalState() || {isBlock: false};
    const modal     = ModalStore.useOptionalState();
    const drawer    = DrawerStore.useOptionalState();

    const onDefaultSubmit = () => {
        if (withAutoClose) {
            modal?.close();
            drawer?.close();
        }
        withSuccessNotification({
            withTranslation,
        });
    };

    return <Box pos={"relative"}>
        <LoadingOverlay visible={isBlock}/>
        <form
            onSubmit={form.onSubmit(request => {
                onSubmit?.({request, onDefaultSubmit});
            })}
        >
            {children}
            <Divider
                mt={"md"}
            />
            <Group
                position={"center"}
                mt={"md"}
            >
                <Button
                    size={"lg"}
                    disabled={!form.isValid()}
                    type={"submit"}
                    {...submitProps}
                >
                    <Translation
                        {...withTranslation}
                        label={`${withTranslation.label}.submit.button`}
                    />
                </Button>
            </Group>
        </form>
    </Box>;
};

export interface IDtoFormProps<TFormSchema extends IFormSchema> extends Omit<IFormProps<TFormSchema>, "toRequest"> {
    /**
     * Map form data (values) to request object required by a remote side
     */
    toRequest: IFormToRequestWithDto<TFormSchema>;
    toValues: IFormToValues<TFormSchema>;
    /**
     * Use response to set default values from a remote object
     */
    dto: TFormSchema["Dto"];
}

export const DtoForm = <TFormSchema extends IFormSchema>({toRequest, toValues, dto, ...props}: IDtoFormProps<TFormSchema>) => {
    return <Form
        toRequest={values => toRequest({
            values,
            dto,
        })}
        defaultValues={toValues({dto})}
        {...props}
    />;
};
