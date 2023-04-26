import {
    type IFormInputsFactory,
    type IFormInputsOverrideFactory,
    type IFormMapper,
    type IFormSchema,
    type IFormSchemaType,
    type IFormStoreContext,
    type IFormToRequest,
    type IFormToRequestWithDto,
    type IFormToValues,
    type IMantineFormContext
}                               from "@leight/form";
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
    type ComponentProps,
    type PropsWithChildren
}                               from "react";
import {FormStoreProvider}      from "../context";

export type IBaseFormProps<TFormSchemaType extends IFormSchemaType> = PropsWithChildren<{
    MantineContext: IMantineFormContext<TFormSchemaType>;
    schemas?: IFormSchema.of<TFormSchemaType>;
    FormContext: IFormStoreContext<TFormSchemaType>;
    withTranslation: IWithTranslation;
    /**
     * Map form data (values) to request object required by a remote side
     */
    toRequest: IFormToRequest<TFormSchemaType>;
    /**
     * Create typed form inputs based on the Values schema
     */
    inputs: IFormInputsFactory<TFormSchemaType>;
    /**
     * This enables end user to replace default fields defined by a base form (for example when generated)
     */
    inputsOverride?: IFormInputsOverrideFactory<TFormSchemaType>;
    /**
     * Explicitly set default values; if not specified, "response" is used; defaultValues wins over "response"
     */
    defaultValues?: TFormSchemaType["Values"];
    onSubmit?(props: IBaseFormProps.IOnSubmitProps<TFormSchemaType>): void;
    /**
     * Props passed to submit button of the form
     */
    submitProps?: ComponentProps<typeof Button>;
    /**
     * If true, onSuccess also closes drawer/modal it's in (must be modal from @leight)
     */
    withAutoClose?: string[];
}>

export namespace IBaseFormProps {
    export interface IOnSubmitProps<TFormSchemaType extends IFormSchemaType> {
        request: TFormSchemaType["Request"];

        /**
         * Calls default form submit stuff
         */
        onDefaultSubmit(): void;
    }
}

export const BaseForm = <TFormSchemaType extends IFormSchemaType>(
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
    }: IBaseFormProps<TFormSchemaType>) => {
    const {FormProvider, useForm} = MantineContext;
    const {t}                     = useTranslation(withTranslation.namespace);
    const form                    = useForm({
        initialValues:   defaultValues,
        validate:        values => {
            if (!schemas?.ValuesSchema) {
                return {};
            }
            const parsed = schemas.ValuesSchema.safeParse(values);
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
            <FormInternal<TFormSchemaType>
                form={form}
                withTranslation={withTranslation}
                {...props}
            />
        </FormStoreProvider>
    </FormProvider>;
};

interface IFormInternalProps<TFormSchemaType extends IFormSchemaType> extends Omit<IBaseFormProps<TFormSchemaType>, "FormContext" | "MantineContext" | "toRequest" | "inputs" | "inputsOverride"> {
    form: UseFormReturnType<TFormSchemaType["Values"], IFormMapper<TFormSchemaType>>;
}

const FormInternal = <TFormSchemaType extends IFormSchemaType>(
    {
        form,
        onSubmit,
        withTranslation,
        submitProps,
        withAutoClose = [],
        children,
    }: IFormInternalProps<TFormSchemaType>) => {
    const {isBlock} = BlockStore.useOptionalState() || {isBlock: false};
    const modal     = ModalStore.useOptionalState();
    const drawer    = DrawerStore.useOptionalState();

    const onDefaultSubmit = () => {
        withAutoClose.forEach(item => {
            modal?.close(item);
            drawer?.close(item);
        });
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
                    loading={isBlock}
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

export interface IDtoFormProps<TFormSchemaType extends IFormSchemaType> extends Omit<IBaseFormProps<TFormSchemaType>, "toRequest"> {
    /**
     * Map form data (values) to request object required by a remote side
     */
    toRequest: IFormToRequestWithDto<TFormSchemaType>;
    toValues: IFormToValues<TFormSchemaType>;
    /**
     * Use response to set default values from a remote object
     */
    dto: TFormSchemaType["Dto"];
}

export const DtoForm = <TFormSchemaType extends IFormSchemaType>({toRequest, toValues, dto, ...props}: IDtoFormProps<TFormSchemaType>) => {
    return <BaseForm
        toRequest={({values}) => toRequest({
            values,
            dto,
        })}
        defaultValues={toValues({dto})}
        {...props}
    />;
};