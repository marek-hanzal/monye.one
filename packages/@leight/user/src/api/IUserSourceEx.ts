import {type IUserSourceSchemaType} from "../sdk";

export interface IUserSourceEx {
    findByEmail(email: string): Promise<IUserSourceSchemaType["Entity"]>;
}
