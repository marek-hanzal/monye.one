import {type IWithTranslation}  from "@leight/i18n";
import {
    Translation,
    useTranslation
}                               from "@leight/i18n-client";
import {
    Button,
    Group
}                               from "@mantine/core";
import {type UseFormReturnType} from "@mantine/form";
import {type PropsWithChildren} from "react";
import {
    type IFormInputsFactory,
    type IFormInputsOverrideFactory,
    type IFormMapper,
    type IFormSchema,
    type IFormSchemas
}                               from "../api";
import {
    FormStoreProvider,
    type IFormStoreContext,
    type IMantineFormContext
}                               from "../context";
import {
    FormRequestSchema,
    FormResponseSchema,
    FormValuesSchema,
    type IFormRequestSchema,
    type IFormResponseSchema,
    type IFormValuesSchema
}                               from "../schema";

export type IWithFormSchemasProps<
    TValuesSchema extends IFormValuesSchema,
    TRequestSchema extends IFormRequestSchema,
    TResponseSchema extends IFormResponseSchema,
> = Partial<IFormSchemas<IFormSchema<TValuesSchema, TRequestSchema, TResponseSchema>>>;

export const withFormSchemas = <
    TValuesSchema extends IFormValuesSchema,
    TRequestSchema extends IFormRequestSchema,
    TResponseSchema extends IFormResponseSchema,
>(
    {
        ValueSchema = FormValuesSchema as TValuesSchema,
        RequestSchema = FormRequestSchema as TRequestSchema,
        ResponseSchema = FormResponseSchema as TResponseSchema,
    }: IWithFormSchemasProps<TValuesSchema, TRequestSchema, TResponseSchema>): IFormSchemas<IFormSchema<TValuesSchema, TRequestSchema, TResponseSchema>> => ({
    ValueSchema,
    RequestSchema,
    ResponseSchema,
});

export type IFormProps<TFormSchema extends IFormSchema = IFormSchema> = PropsWithChildren<{
    MantineContext: IMantineFormContext<TFormSchema>;
    schemas?: IFormSchemas<TFormSchema>;
    FormContext: IFormStoreContext<TFormSchema>;
    withTranslation: IWithTranslation;
    withMapper: IFormMapper<TFormSchema>;
    /**
     * Create typed form inputs based on the Values schema
     */
    inputs: IFormInputsFactory<TFormSchema>;
    /**
     * This enables end user to replace default fields defined by a base form (for example when generated)
     */
    inputsOverride?: IFormInputsOverrideFactory<TFormSchema>;
    onSubmit?(props: IFormProps.IOnSubmitProps<TFormSchema>): void;
}>;

export namespace IFormProps {
    export interface IOnSubmitProps<TFormSchema extends IFormSchema> {
        request: TFormSchema["Request"];
    }

    export interface IInputsProps<TFormSchema extends IFormSchema> {
        schemas?: IFormSchemas<TFormSchema>;
        FormContext: IFormStoreContext<TFormSchema>;
    }
}

export const Form = <TFormSchema extends IFormSchema = IFormSchema>(
    {
        MantineContext,
        schemas,
        FormContext,
        withTranslation,
        withMapper,
        inputs,
        inputsOverride,
        ...props
    }: IFormProps<TFormSchema>) => {
    const [FormProvider, , useForm] = MantineContext;
    const {t}                       = useTranslation([
        "common",
        withTranslation.namespace,
    ]);
    const form                      = useForm({
        validate:            values => {
            if (!schemas?.ValueSchema) {
                return {};
            }
            const parsed = schemas.ValueSchema.safeParse(values);
            if (parsed.success) {
                return {};
            }
            const errors: Record<string, string> = {};
            parsed.error.errors.forEach(error => {
                errors[error.path.join(".")] = t([
                    `${withTranslation.label}.error.${error.message}`,
                    `form.error.${error.message}`,
                ], withTranslation.values);
            });
            return errors;
        },
        validateInputOnBlur: true,
        transformValues:     withMapper,
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
        >
            <FormInternal<TFormSchema>
                form={form}
                withTranslation={withTranslation}
                {...props}
            />
        </FormStoreProvider>
    </FormProvider>;
};

interface IFormInternalProps<TFormSchema extends IFormSchema = IFormSchema> extends Omit<IFormProps<TFormSchema>, "FormContext" | "MantineContext" | "withMapper" | "inputs" | "inputsOverride"> {
    form: UseFormReturnType<TFormSchema["Values"], IFormMapper<TFormSchema>>;
}

const FormInternal = <TFormSchema extends IFormSchema = IFormSchema>(
    {
        form,
        onSubmit,
        withTranslation,
        children,
    }: IFormInternalProps<TFormSchema>) => {
    return <form
        onSubmit={form.onSubmit(request => onSubmit?.({request}))}
    >
        {children}
        <Group
            position={"center"}
            mt={"md"}
        >
            <Button
                size={"lg"}
                disabled={!form.isValid()}
                type={"submit"}
            >
                <Translation
                    {...withTranslation}
                    label={`${withTranslation.label}.submit.button`}
                />
            </Button>
        </Group>
    </form>;
};
