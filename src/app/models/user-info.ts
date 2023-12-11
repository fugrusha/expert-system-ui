import { UserType } from "./enum/userType";

export interface IUserInfo {
    id: string;
    userType: UserType;
    username: string;
    profilePictureURL: string;
    otherProfileInformation: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
}

