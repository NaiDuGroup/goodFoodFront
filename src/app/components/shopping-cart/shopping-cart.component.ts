import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ShoppingCartService } from 'src/app/servicies';
import { CartDialogComponent } from '../cart-dialog/cart-dialog.component';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {

  amountOfItems: number = 0;

  private _sub: Subscription;

  constructor(
    private _shoppingCart: ShoppingCartService,
    public dialog: MatDialog
  ) { 
    this._sub = new Subscription();
  }

  ngOnInit(): void {
    this._sub.add(
      this._shoppingCart.getTotalPriceOfItems().pipe(
        tap((resp) => this.amountOfItems = resp)
      ).subscribe()
    );

    this._sub.add(
      this._shoppingCart.getCartItems().pipe(
        tap((resp) => console.log(resp))
      ).subscribe()
    );
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe()
  }

  openCart(): void {
    console.log('dialog');
    
    this.dialog.open(CartDialogComponent,
      {panelClass: 'myapp-no-padding-dialog'}
    );
  }

}
