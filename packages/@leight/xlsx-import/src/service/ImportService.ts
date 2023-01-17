import "reflect-metadata";
import {
    inject,
    injectable
} from "tsyringe";
import {
    $MetaService,
    type IImportService,
    type IMetaService
} from "../api";

@injectable()
export class ImportService implements IImportService {
    constructor(
        @inject($MetaService) protected metaService: IMetaService
    ) {
    }

    fun(): string {
        return "yep, I'm here 2!";
    }
}
