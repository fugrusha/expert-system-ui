import { IProperty } from "./property"
import { IUserInfo } from "./user-info"

export interface IBuyerRequest {
    id: string
    buyer: IUserInfo
    seller: IUserInfo
    property: IProperty
    timestamp: Date
    status: BuyerRequestStatus
}

export enum BuyerRequestStatus {
    NEW = 'NEW', 
    PROCESSING = 'PROCESSING',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED',
}