import { INotice } from "./notice.interface";
import { IBill } from './bill.interface'

export interface IDwelling {
    code: string,
    announcements: INotice[],
    roommates: INotice[],
    bills: IBill[]
    landlord: INotice[],
    owner: string,
    tenants: string[]
}