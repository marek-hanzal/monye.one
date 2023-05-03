import {
    type IJobPrismaSchemaType,
    type IJobSourceSchemaType
}                            from "@leight/job";
import {JobBasePrismaSource} from "../sdk";

export class JobSource extends JobBasePrismaSource {
    toWhereUnique(filter: IJobSourceSchemaType["Filter"]): IJobPrismaSchemaType["WhereUnique"] {
        const {id} = filter;

        if (id) {
            return {
                id,
            };
        }

        return {};
    }
}
