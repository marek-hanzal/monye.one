import {type IWithIdentity} from "./api";

export const withPatch = <T extends IWithIdentity>({id, ...patch}: T) => {
    return {
        data:  patch,
        where: {id},
    };
};
