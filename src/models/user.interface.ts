export interface IUser {
    username: string,
    firstname: string,
    lastname: string,
    password?: string,
    currentDwelling: string,
    availableDwellings: string[],
    refreshToken: string
}