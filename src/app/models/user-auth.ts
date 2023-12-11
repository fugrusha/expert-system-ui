import { UserType } from "./enum/userType";

export interface IUserAuth {
    userType: UserType
    username: string
    id: string
    token: string
}