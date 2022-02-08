import { User } from "./user.model";

export interface Category {
    id: number,
    description: string,
    createdBy: User,
    updatedBy: User
}
