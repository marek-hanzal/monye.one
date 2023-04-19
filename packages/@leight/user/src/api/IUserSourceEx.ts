import {type IUserSourceSchema} from "../sdk";

export interface IUserSourceEx {
    findByEmail(email: string): Promise<IUserSourceSchema["Entity"]>;
}
