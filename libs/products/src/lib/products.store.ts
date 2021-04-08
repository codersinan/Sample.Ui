import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ComponentStore, tapResponse } from '@ngrx/component-store';

import { EMPTY, Observable } from 'rxjs';
import { catchError, concatMap, tap } from 'rxjs/operators';

import { ProductResponse } from './responses';
import { ProductsService } from './services/products.service';

import { CreateProductRequest, PatchProductRequest, UpdateProductRequest } from './requests';

export const enum LoadingState {
    INIT = 'INIT',
    LOADING = 'LOADING',
    LOADED = 'LOADED'
}

export interface ErrorState {
    errorMessage: HttpErrorResponse;
}
export type CallState = LoadingState | ErrorState;

export interface ProductsState {
    products?: ProductResponse[];
    selectedProduct?: ProductResponse;
    callState: CallState;
}

function getError(callState: CallState): HttpErrorResponse | null {
    if ((callState as ErrorState).errorMessage !== undefined) {
        return (callState as ErrorState).errorMessage;
    }
    return null;
}

@Injectable()
export class ProductsStore extends ComponentStore<ProductsState>{
    constructor(
        private productsService: ProductsService
    ) {
        super({ callState: LoadingState.INIT })
    }

    private readonly loading$: Observable<boolean> = this.select(state => state.callState === LoadingState.LOADING);
    private readonly products$: Observable<ProductResponse[]> = this.select(state => state.products);
    private readonly error$: Observable<HttpErrorResponse> = this.select(state => getError(state.callState));
    private readonly selected$: Observable<ProductResponse> = this.select(state => state.selectedProduct);

    readonly vm$ = this.select(
        this.products$,
        this.selected$,
        this.loading$,
        this.error$,
        (products, selected, loading, error) => ({
            products, selected, loading, error
        })
    );

    // UPDATERS
    private readonly updateError = this.updater((state, error: HttpErrorResponse) => ({ ...state, callState: { errorMessage: error } }))
    private readonly setLoading = this.updater((state, loading: LoadingState) => ({ ...state, callState: loading }));
    private readonly setSelectedProduct = this.updater((state, product: ProductResponse) => ({
        ...state, selectedProduct: product
    }))

    private readonly insertProduct = this.updater(
        (state, product: ProductResponse) => ({ ...state, products: [...state.products, product] })
    )
    private readonly insertProducts = this.updater((state, products: ProductResponse[]) => ({ ...state, products: products }))
    private readonly replaceProduct = this.updater((state, product: ProductResponse) => {
        const index = state.products.findIndex(x => x.id === product.id);
        state.products.splice(index, 1, product);
        return ({ ...state })
    }
    );
    private readonly removeProduct = this.updater(
        (state, productId: number) => ({ ...state, products: state.products.filter(x => x.id !== productId) })
    )

    //EFFECTS
    readonly getProducts = this.effect(trigger$ => trigger$.pipe(
        tap(() => this.setLoading(LoadingState.LOADING)),
        concatMap(() => {
            return this.productsService.getAll().pipe(
                tapResponse((products: ProductResponse[]) => {
                    this.insertProducts(products);
                    this.setLoading(LoadingState.LOADED);
                }, (e: HttpErrorResponse) => this.updateError(e)
                ), catchError(() => EMPTY)
            )
        })
    ));

    readonly selectProduct = this.effect<ProductResponse>(product$ => product$.pipe(
        tap((product: ProductResponse) => {
            this.setSelectedProduct(product);
        }),
        catchError(() => EMPTY)
    ));

    readonly addProduct = this.effect<CreateProductRequest>(products$ =>
        products$.pipe(
            tap(() => this.setLoading(LoadingState.LOADING)),
            concatMap((product: CreateProductRequest) =>
                this.productsService.add(product).pipe(
                    tapResponse(product => {
                        this.insertProduct(product);
                        this.setSelectedProduct(product);
                        this.setLoading(LoadingState.LOADED);
                    }, (e: HttpErrorResponse) => this.updateError(e)
                    ), catchError(() => EMPTY)
                )
            )
        )
    );
    readonly updateProduct = this.effect<UpdateProductRequest>(product$ =>
        product$.pipe(
            tap(() => this.setLoading(LoadingState.LOADING)),
            concatMap((product) =>
                this.productsService.update(product.id, product).pipe(
                    tapResponse(product => {
                        this.replaceProduct(product);
                        this.setSelectedProduct(product);
                        this.setLoading(LoadingState.LOADED);
                    }, (e: HttpErrorResponse) => this.updateError(e)
                    ), catchError(() => EMPTY)
                )
            )
        )
    );

    readonly patchProduct = this.effect<PatchProductRequest>(request$ =>
        request$.pipe(
            tap(() => this.setLoading(LoadingState.LOADING)),
            concatMap((request) =>
                this.productsService.patch(request.id, request.operations).pipe(
                    tapResponse(product => {
                        this.replaceProduct(product);
                        this.setSelectedProduct(product);
                        this.setLoading(LoadingState.LOADED);
                    }, (e: HttpErrorResponse) => this.updateError(e)
                    ), catchError(() => EMPTY)
                )
            )
        )
    );

    readonly deleteProduct = this.effect<number>((productId$) =>
        productId$.pipe(
            tap(() => this.setLoading(LoadingState.LOADING)),
            concatMap((productId) => {
                return this.productsService.delete(productId).pipe(
                    tapResponse(() => {
                        this.removeProduct(productId);
                        this.setSelectedProduct(null);
                        this.setLoading(LoadingState.LOADED);
                    }, (e: HttpErrorResponse) => this.updateError(e)
                    ), catchError(() => EMPTY)
                )
            })
        )
    )
}