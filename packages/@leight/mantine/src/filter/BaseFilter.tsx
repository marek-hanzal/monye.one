import {type IWithTranslation}  from "@leight/i18n";
import {type ISourceSchemaType} from "@leight/source";
import {IconFilter}             from "@tabler/icons-react";
import {type FC}                from "react";
import {DrawerButton}           from "../button";
import {Drawer}                 from "../component";
import {DrawerStoreProvider}    from "../context";

export type IFilterFC<TSourceSchemaType extends ISourceSchemaType> = FC<IBaseFilterProps<TSourceSchemaType>>;

export interface IBaseFilterProps<TSourceSchemaType extends ISourceSchemaType> {
    withTranslation?: IWithTranslation;
}

export const BaseFilter = <TSourceSchemaType extends ISourceSchemaType>(
    {
        withTranslation,
    }: IBaseFilterProps<TSourceSchemaType>) => {
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
            foo barr
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
