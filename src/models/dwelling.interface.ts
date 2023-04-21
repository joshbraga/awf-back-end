import { INotice } from "./notice.interface";
import { IBill } from './bill.interface'

export interface IDwelling {
    announcements: INotice[],
    roommates: INotice[],
    bills: IBill[]
    landlord: INotice[]
}