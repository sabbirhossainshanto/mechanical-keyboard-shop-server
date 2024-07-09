import { Types } from "mongoose"

export type TOrder = {
    productId:Types.ObjectId;
    price:number;
    quantity:number;
    isDeleted:boolean;
}