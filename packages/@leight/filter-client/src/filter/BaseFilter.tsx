import {type IWithTranslation} from "@leight/i18n";
import {
    Drawer,
    DrawerButton,
    DrawerStoreProvider
}                              from "@leight/mantine";
import {IconFilter}            from "@tabler/icons-react";
import {PropsWithChildren}     from "react";

export type IBaseFilterProps = PropsWithChildren<{
    withTranslation?: IWithTranslation;
}>;

export const BaseFilter = (
    {
        children,
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
            {children}
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
