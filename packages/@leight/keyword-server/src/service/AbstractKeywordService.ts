import {
    $KeywordSource,
    type IKeywords,
    type IKeywordService,
    type IKeywordSource
}                   from "@leight/keyword";
import {keywordsOf} from "@leight/utils";

export abstract class AbstractKeywordService<TInput> implements IKeywordService<TInput> {
    static inject = [
        $KeywordSource,
    ];

    protected constructor(
        protected keywordSource: IKeywordSource,
    ) {
    }

    async build({input}: IKeywordService.IBuildProps<TInput>): Promise<string[]> {
        await this.onBuild({input});

        const keywords = (await this.keywordsOf(input)).filter(Boolean).reduce<string[]>((prev, current) => {
            return prev.concat(keywordsOf(current) || []);
        }, []);

        for (const keyword of keywords) {
            await this.onKeyword({
                input,
                keyword,
                entity: await this.keywordSource.upsert({
                    filter: {keyword},
                    create: {
                        text: keyword,
                    },
                    patch:  {
                        text: keyword,
                    },
                }),
            });
        }

        return keywords;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async onBuild(props: IKeywordService.IOnBuildProps<TInput>): Promise<any> {
        // empty
    }

    abstract keywordsOf(input: TInput): Promise<IKeywords>;

    abstract onKeyword(props: IKeywordService.IOnKeywordProps<TInput>): Promise<any>;
}
