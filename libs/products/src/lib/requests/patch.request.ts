import { Operation } from 'fast-json-patch';

export interface PatchProductRequest {
    id: number;
    operations?: Operation[];
}