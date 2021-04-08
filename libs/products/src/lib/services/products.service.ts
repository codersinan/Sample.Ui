import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

import { ProductResponse } from '../responses/product.response';
import { CreateProductRequest, UpdateProductRequest } from '../requests';

import { Operation } from 'fast-json-patch';

@Injectable({ providedIn: 'root' })
export class ProductsService {
    constructor(private httpClient: HttpClient) { }

    private headers = new HttpHeaders().set('content-type', 'application/json');

    getAll(): Observable<ProductResponse[]> {
        return this.httpClient.get<ProductResponse[]>(
            `/api/product`
        ).pipe(delay(500));
    }

    get(id: number) {
        return this.httpClient.get<ProductResponse>(
            `/api/product/${id}`
        ).pipe(delay(500));;
    }

    add(request: CreateProductRequest) {
        return this.httpClient.post<ProductResponse>(
            `/api/product`,
            JSON.stringify(request), { headers: this.headers }
        ).pipe(delay(500));;
    }

    update(id: number, request: UpdateProductRequest) {
        return this.httpClient.put<ProductResponse>(
            `/api/product/${id}`,
            JSON.stringify(request), { headers: this.headers }
        ).pipe(delay(500));;
    }

    patch(id: number, operations: Operation[]) {
        return this.httpClient.patch<ProductResponse>(
            `/api/product/${id}`,
            JSON.stringify(operations), { headers: this.headers }
        ).pipe(delay(500));;
    }
    delete(id: number) {
        return this.httpClient.delete(
            `/api/product/${id}`
        ).pipe(delay(500));;
    }
}