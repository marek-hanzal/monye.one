import {
    type IFormProps,
    type IFormSchemaType,
    type IFormValuesSchema
}                               from "@leight/form-client";
import {type IWithTranslation}  from "@leight/i18n";
import {type ISourceSchemaType} from "@leight/source";
import {IconFilter}             from "@tabler/icons-react";
import {type FC}                from "react";
import {DrawerButton}           from "../button";
import {Drawer}                 from "../component";
import {DrawerStoreProvider}    from "../context";

export type IFilterFC<TValueSchema extends IFormValuesSchema, TSourceSchemaType extends ISourceSchemaType> = FC<IBaseFilterProps<TValueSchema, TSourceSchemaType>>;

export interface IBaseFilterProps<TValueSchema extends IFormValuesSchema, TSourceSchemaType extends ISourceSchemaType> {
    Form: FC<IFormProps<IFormSchemaType<TValueSchema, TSourceSchemaType["Filter"], TSourceSchemaType["Filter"]>>>;
    FormProps: IFormProps<IFormSchemaType<TValueSchema, TSourceSchemaType["Filter"], TSourceSchemaType["Filter"]>>;
    withTranslation?: IWithTranslation;
}

export const BaseFilter = <TValueSchema extends IFormValuesSchema, TSourceSchemaType extends ISourceSchemaType>(
    {
        Form,
        FormProps,
        withTranslation,
    }: IBaseFilterProps<TValueSchema, TSourceSchemaType>) => {
    return <DrawerStoreProvider>
        <Drawer
            drawerId={"filter"}
            size={"lg"}
            withTranslation={{
                ...withTranslation,
                label: withTranslation?.label || "drawer",
            }}
            title={"filter.title"}
            closeOnClickOutside={false}
        >
            <Form {...FormProps}/>
        </Drawer>
        <DrawerButton
            drawerId={"filter"}
            withTranslation={withTranslation}
            variant={"subtle"}
            leftIcon={<IconFilter/>}
            label={"filter.button"}
        />
    </DrawerStoreProvider>;
};
