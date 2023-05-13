/**
	This is a file generated by MCP (managed code pattern) approach.
    
    So, please, DO NOT modify this file as it would get re-generated and you would be f*cked up.
 */
import {type IFormSchemaType} from "@leight/form";
import {
	type ISourceMultiSelectProps,
	SourceMultiSelect
} from "@leight/form-client";
import {FilterMultiSelection} from "../selection/FilterMultiSelection";
import {FilterSource as Source} from "../source/FilterSource";
import {type IFilterSourceSchema as SourceSchema} from "@leight/filter";

export interface IFilterMultiSourceSelect<TFormSchemaType extends IFormSchemaType> extends Omit<ISourceMultiSelectProps<TFormSchemaType, SourceSchema>, "SelectionContext" | "Source"> {
}

export const FilterMultiSourceSelect = <TFormSchemaType extends IFormSchemaType>(props: IFilterMultiSourceSelect<TFormSchemaType>) => {
    return <SourceMultiSelect<TFormSchemaType, SourceSchema>
        SelectionContext={FilterMultiSelection}
        Source={Source}
        {...props}
    />
};
/**
 * Default export marking a file it's generated and also preventing failing
 * an empty file export (every module "must" have an export).
 */
export const $leight_rpe99chvsalfcwqwhf6g7cms = true;