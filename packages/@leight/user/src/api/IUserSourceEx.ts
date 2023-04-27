import {type IUserSourceSchemaType} from "../schema";
import {type IUserSource}           from "../sdk";

export interface IUserSourceEx extends IUserSource {
    findByEmail(email: string): Promise<IUserSourceSchemaType["Entity"]>;
}
