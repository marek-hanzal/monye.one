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
    }

export const Fulltext = <TSourceSchemaType extends ISourceSchemaType>(
    {
        SourceStore,
        withTranslation,
        ...props
    }: IFulltextProps<TSourceSchemaType>) => {
    const {t}                     = useTranslation(withTranslation?.namespace);
    const [fulltext, setFulltext] = useDebouncedState("", 350);
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

    useEffect(() => {
        setFilter({
            ...filter,
            fulltext: fulltext || undefined
        });
    }, [fulltext]);

    return <TextInput
        onChange={event => setFulltext(event.currentTarget.value)}
        placeholder={t(`${withTranslation?.label || "table"}.fulltext.placeholder`)}
        rightSection={isLoading || isFetching ? <Loader size="xs"/> : <WithIcon icon={<IconSearch/>}/>}
        {...props}
    />;
};
