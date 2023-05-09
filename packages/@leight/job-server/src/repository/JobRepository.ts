import {type IJobRepositorySchemaEx, type JobSource} from "@leight/job";
import {BaseJobRepositoryEx} from "../sdk";

export class JobRepository extends BaseJobRepositoryEx {
    toWhereUnique(filter: JobSource["Type"]["Filter"]): IJobRepositorySchemaEx["Type"]["WhereUnique"] {
        const {id} = filter;

        if (id) {
            return {
                id,
            };
        }

        return {};
    }
}
