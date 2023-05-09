import {type UserSource} from "../schema";
import {type IUserRepository} from "../sdk";

export interface IUserSourceEx extends IUserRepository {
    findByEmail(email: string): Promise<UserSource['Type']["Entity"]>;
}
