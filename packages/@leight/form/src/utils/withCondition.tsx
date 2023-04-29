import {
    type IFormSchemaType,
    type IUseForm
} from "../api";

export type IWithCondition<TFormSchema extends IFormSchemaType> = {
    form: IUseForm<TFormSchema>;
    bool: boolean | null | undefined;
    whenTrue?: TFormSchema["OptionalValues"];
    whenFalse?: TFormSchema["OptionalValues"];
    callback?(): void;
};

export const withCondition = <TFormSchema extends IFormSchemaType>(
    {
        form,
        bool,
        whenTrue = {},
        whenFalse = {},
        callback,
    }: IWithCondition<TFormSchema>) => {
    if (bool) {
        callback?.();
        form.setValues(whenTrue);
    }
    if (!bool) {
        form.setValues(whenFalse);
        callback?.();
    }
};
