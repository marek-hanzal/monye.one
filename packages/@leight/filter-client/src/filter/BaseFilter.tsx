import {type IFormValuesSchema} from "@leight/form";
import {type IWithTranslation}  from "@leight/i18n";
import {
    Drawer,
    DrawerButton,
    DrawerStoreProvider
}                               from "@leight/mantine";
import {type ISourceSchemaType} from "@leight/source";
import {IconFilter}             from "@tabler/icons-react";
import {type FC}                from "react";

export type IFilterFC<TValueSchema extends IFormValuesSchema, TSourceSchemaType extends ISourceSchemaType> = FC<Omit<IBaseFilterProps, "Form">>;

export interface IBaseFilterProps {
    Form: FC;
    withTranslation?: IWithTranslation;
}

export const BaseFilter = (
    {
        Form,
        withTranslation,
    }: IBaseFilterProps) => {
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
            <Form/>
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
