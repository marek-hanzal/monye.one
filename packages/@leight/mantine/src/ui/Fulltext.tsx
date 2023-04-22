import {type IWithTranslation} from "@leight/i18n";
import {useTranslation}        from "@leight/i18n-client";
import {
    type ISourceSchemaType,
    type ISourceStore
}                              from "@leight/source";
import {
    Loader,
    TextInput
}                              from "@mantine/core";
import {useDebouncedState}     from "@mantine/hooks";
import {IconSearch}            from "@tabler/icons-react";
import {
    ComponentProps,
    useEffect
}                              from "react";
import {WithIcon}              from "../component";

export type IFulltextProps<TSourceSchemaType extends ISourceSchemaType> =
    ComponentProps<typeof TextInput>
    & {
        SourceStore: ISourceStore<TSourceSchemaType>;
        withTranslation?: IWithTranslation;
        onSearch?(value?: string): void;
    }

export const Fulltext = <TSourceSchemaType extends ISourceSchemaType>(
    {
        SourceStore,
        withTranslation,
        onSearch,
        ...props
    }: IFulltextProps<TSourceSchemaType>) => {
    const {t}                     = useTranslation(withTranslation?.namespace);
    const {
              isFetching,
              isLoading,
          }                       = SourceStore.Source.useState((
        {
            isFetching,
            isLoading,
        }) => (
        {
            isFetching,
            isLoading,
        }));
    const {filter, setFilter}     = SourceStore.Filter.useState(({filter, setFilter}) => ({filter, setFilter}));
    const [fulltext, setFulltext] = useDebouncedState(filter?.fulltext || "", 350);

    useEffect(() => {
        setFilter({
            ...filter,
            fulltext: fulltext || undefined,
        });
        onSearch?.(fulltext || undefined);
    }, [fulltext]);

    return <TextInput
        defaultValue={filter?.fulltext}
        onChange={event => setFulltext(event.currentTarget.value)}
        placeholder={t(`${withTranslation?.label || "table"}.fulltext.placeholder`)}
        rightSection={isLoading || isFetching ? <Loader size="xs"/> : <WithIcon icon={<IconSearch/>}/>}
        {...props}
    />;
};
