import {type UserSource}      from "../schema";
import {type IUserRepository} from "../sdk";

export interface IUserRepositoryEx extends IUserRepository {
    findByEmail(email: string): Promise<UserSource['Type']["Entity"]>;
}
