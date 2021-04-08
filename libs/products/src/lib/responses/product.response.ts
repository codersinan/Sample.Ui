import { TagResponse } from "./tag.response";
export interface ProductResponse {
    id: number;
    name: string;
    description: string;
    tags: TagResponse[];
    created: Date;
    lastModified?: Date;
}