import {type ISourceSchemaType} from "@leight/source";
import {Button}                 from "@mantine/core";
import {IconFilter}             from "@tabler/icons-react";
import {type FC}                from "react";

export type IFilterFC<TSourceSchemaType extends ISourceSchemaType> = FC<IBaseFilterProps<TSourceSchemaType>>;

export interface IBaseFilterProps<TSourceSchemaType extends ISourceSchemaType> {
}

export const BaseFilter = <TSourceSchemaType extends ISourceSchemaType>(props: IBaseFilterProps<TSourceSchemaType>) => {
    return <Button
        variant={"subtle"}
        leftIcon={<IconFilter/>}
    >
        base filter
    </Button>;
};
