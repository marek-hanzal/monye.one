import {
    type IUserRepository,
    type IUserSourceType
} from "../sdk";

export interface IUserRepositoryEx extends IUserRepository {
    findByEmail(email: string): Promise<IUserSourceType["Entity"]>;
}
