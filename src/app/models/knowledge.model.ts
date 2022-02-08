import { User } from "./user.model";
import { Category } from './category.model';

export interface Knowledge {
    id: number,
    category: Category,
    title: string,
    description: string,
    createdBy: User,
    updatedBy: User
    createdAt: Date,
    updateAt: Date
}
