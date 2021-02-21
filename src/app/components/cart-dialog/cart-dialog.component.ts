import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShoppingCartService } from 'src/app/servicies';
import { tap } from 'rxjs/operators';

import { Product } from 'src/app/types';

@Component({
  selector: 'app-cart-dialog',
  templateUrl: './cart-dialog.component.html',
  styleUrls: ['./cart-dialog.component.scss']
})
export class CartDialogComponent implements OnInit, OnDestroy {

  cartItems: Product[];
  productCountMap: {} = {};
  totalPrice: number = 0;
  
  private _sub: Subscription;

  constructor(
    private _shoppingCart: ShoppingCartService,
    private _cdr: ChangeDetectorRef,
  ) {
    this._sub = new Subscription();
   }

  ngOnInit(): void {

    this._sub.add(
      this._shoppingCart.getCartItemsToDisplay().pipe(
        tap((cartItems) => this.cartItems = cartItems)
      ).subscribe()
    );

    this._sub.add(
      this._shoppingCart.getProductCountMap().pipe(
        tap((countMap) => this.productCountMap = countMap)
      ).subscribe()
    )

    this._sub.add(
      this._shoppingCart.getTotalPriceOfItems().pipe(
        tap((total) => this.totalPrice = total)
      ).subscribe()
    )

  }

  ngOnDestroy(): void {
    this._sub.unsubscribe()
  }

  addOneToCart(product: Product): void {
    this._shoppingCart.addItem(product);
    console.log('+');
  }

  subOneFromCart(product: Product): void {
    this._shoppingCart.deleteOneItem(product);
    console.log('-');
  }

  deleteItem(product: Product): void {
    console.log(product.itemLabel, "deleted");
    this._shoppingCart.deleteItem(product);
    this._cdr.detectChanges();
  }

}
