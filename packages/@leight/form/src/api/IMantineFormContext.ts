import {type createFormContext as createCoolFormContext} from "@mantine/form";
import {type IFormMapper}                                from "./IFormMapper";
import {type IFormSchemaType}                            from "./IFormSchemaType";

export type IMantineFormContext<TFormSchemaType extends IFormSchemaType> = {
    FormProvider: ReturnType<typeof createCoolFormContext<TFormSchemaType["Values"], IFormMapper<TFormSchemaType>>>[0];
    useFormContext: ReturnType<typeof createCoolFormContext<TFormSchemaType["Values"], IFormMapper<TFormSchemaType>>>[1];
    useForm: ReturnType<typeof createCoolFormContext<TFormSchemaType["Values"], IFormMapper<TFormSchemaType>>>[2];
};
