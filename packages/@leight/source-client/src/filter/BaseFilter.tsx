import {type IWithTranslation}  from "@leight/i18n";
import {
    Drawer,
    DrawerButton,
    DrawerStoreProvider
}                               from "@leight/mantine";
import {type ISourceSchemaType} from "@leight/source";
import {IconFilter}             from "@tabler/icons-react";
import {type FC}                from "react";

export type IFilterFC<TSourceSchemaType extends ISourceSchemaType> = FC<IBaseFilterProps<TSourceSchemaType>>;

export interface IBaseFilterProps<TSourceSchemaType extends ISourceSchemaType> {
    withTranslation?: IWithTranslation;
}

export const BaseFilter = <TSourceSchemaType extends ISourceSchemaType>(
    {
        withTranslation,
    }: IBaseFilterProps<TSourceSchemaType>) => {
    return <>
        <DrawerStoreProvider>
            <Drawer
                size={"lg"}
                withTranslation={{
                    ...withTranslation,
                    label: withTranslation?.label || "drawer",
                }}
                title={"filter.title"}
                closeOnClickOutside={false}
            >
                foo barr
            </Drawer>
            <DrawerButton
                withTranslation={withTranslation}
                variant={"subtle"}
                leftIcon={<IconFilter/>}
                label={"filter.button"}
            />
        </DrawerStoreProvider>
    </>;
};
