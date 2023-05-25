import {
    type IJobRepositoryExType,
    type IJobSourceType
}                            from "@leight/job";
import {BaseJobRepositoryEx} from "../sdk";

export class JobRepository extends BaseJobRepositoryEx {
    toWhereUnique(filter: IJobSourceType["Filter"]): IJobRepositoryExType["WhereUnique"] {
        const {id} = filter;

        if (id) {
            return {
                id,
            };
        }

        return {};
    }
}
