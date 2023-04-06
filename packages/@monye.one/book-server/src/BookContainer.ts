import {type IContainer} from "@leight/container";

export interface IBookContainer {
}

export const BookContainer = (container: IContainer): IBookContainer => {
    // container
    //     .bindClass($BookImportService, BookImportService)
    //     .bindClass($BookSource, BookSource);

    return {
        // get BookImportService() {
        //     return container.resolve<IBookImportService>($BookImportService);
        // },
        // get BookSource() {
        //     return container.resolve<IBookSource>($BookSource);
        // },
    };
};
