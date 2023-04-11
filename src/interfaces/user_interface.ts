export interface IUser {
    _id: string,
    firstName: string,
    lastName: string,
    username: string,
    bio: string,
    privacyMode: number,
    pictures: string[],
}
export interface IUserGeneralInfo {
    firstName: string,
    lastName: string,
    username: string,
    bio: string,
}
export interface IUserPasswordInfo {
    oldPassword: string,
    newPassword: string,
}
export interface IPostIds {
    result: string,
    message: string,
    data: {
        _id: string
    }[]
}
export interface IUserMetaData {
    _id: string,
    firstName: string,
    lastName: string,
    username: string,
}
export interface ILoginCredentials {
    username: string,
    password: string,
}
export interface ISignupCredentials {
    firstName: string,
    lastName: string,
    username: string,
    password: string,
}