import {type IUserSourceSchema} from "../sdk/Source/UserSchema";

export interface IUserSourceEx {
    findByEmail(email: string): Promise<IUserSourceSchema["Entity"]>;
}
