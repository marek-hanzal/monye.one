import * as Eta          from "eta";
import {type EtaConfig}  from "eta";
import {
    mkdirSync,
    writeFileSync
}                        from "node:fs";
import {
    dirname,
    normalize
}                        from "node:path";
import * as process      from "process";
import {type IGenerator} from "../../api";

export interface IWithTemplateParams {
    templates: IWithTemplateParams.ITemplate[];
    context?: Record<string, any>;
    config?: Partial<EtaConfig>;
}

export namespace IWithTemplateParams {
    export interface ITemplate {
        renders: IRender[] | IRender;
        context?: Record<string, any>;
        config?: Partial<EtaConfig>;
    }

    export interface IRender {
        template: string;
        file: string;
    }
}

export const withTemplate: IGenerator<IWithTemplateParams> = async (
    {
        directory,
        params: {
                    templates,
                    context: globalContext,
                    config
                }
    }
) => {
    const etaConfig: Partial<EtaConfig> = {
        autoEscape: false,
        autoTrim:   false,
        cache:      false,
        tags:       ["{{", "}}"],
        ...config,
    };

    for (const {
        renders,
        context = {},
        config,
    } of templates) {
        const $context = {...globalContext, ...context};
        const $etaConfig = {...etaConfig, ...config};

        for (const {
            template,
            file
        } of Array.isArray(renders) ? renders : [renders]) {
            const $file = normalize(Eta.render(`${directory}/${file}`, $context, $etaConfig));
            const $template = Eta.render(normalize(`${process.cwd()}/${template}`), {
                ...$context,
                $file,
            }, $etaConfig);

            mkdirSync(dirname($file), {recursive: true});

            writeFileSync($file, await Eta.renderFile($template, {
                ...$context,
                $file,
                $template: $template.replace(normalize(process.cwd()), ""),
            }, $etaConfig), {
                flag:     "w+",
                encoding: "utf8",
            });
        }
    }
};
