import {type IWithTranslation} from "@leight/i18n";
import {useTranslation}        from "@leight/i18n-client";
import {type ISourceStore}     from "@leight/source";
import {FulltextStoreContext}  from "@leight/source-client";
import {generateId}            from "@leight/utils";
import {
    ActionIcon,
    Loader,
    TextInput
}                              from "@mantine/core";
import {useDebouncedState}     from "@mantine/hooks";
import {
    IconSearch,
    IconX
}                              from "@tabler/icons-react";
import {
    type ComponentProps,
    type FC,
    useEffect
}                              from "react";
import {WithIcon}              from "../component";

export type IFulltextProps =
    ComponentProps<typeof TextInput>
    & {
        SourceStore: ISourceStore<any>;
        loading?: boolean;
        debounce?: number;
        withTranslation?: IWithTranslation;
        onSearch?(value?: string): void;
    }

export const Fulltext: FC<IFulltextProps> = (
    {
        SourceStore,
        loading,
        debounce = 500,
        withTranslation,
        onSearch,
        ...props
    }) => {
    const {t}                       = useTranslation(withTranslation?.namespace);
    const {fulltext, setFulltext}   = FulltextStoreContext.useState(({fulltext, setFulltext}) => ({fulltext, setFulltext}));
    const {setPage}                 = SourceStore.Query.useState(({setPage}) => ({setPage}));
    const [debounced, setDebounced] = useDebouncedState(fulltext || "", debounce);

    useEffect(() => {
        setFulltext(debounced || undefined);
        onSearch?.(debounced || undefined);
        setPage(0);
    }, [debounced]);

    return <TextInput
        autoFocus
        key={generateId()}
        defaultValue={fulltext || undefined}
        onChange={event => setDebounced(event.currentTarget.value)}
        placeholder={t(`${withTranslation?.label || "table"}.fulltext.placeholder`)}
        icon={loading ? <Loader size="xs"/> : <WithIcon icon={<IconSearch/>}/>}
        rightSection={fulltext ? <ActionIcon
            onClick={() => setFulltext("")}
        >
            <WithIcon icon={<IconX/>}/>
        </ActionIcon> : undefined}
        {...props}
    />;
};
