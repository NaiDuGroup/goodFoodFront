import { Component, Input, OnInit } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';

import { ShoppingCartService } from 'src/app/servicies';
import { Product } from '../../types';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input() product: Product;
  
  constructor(
    private _shoppingCart: ShoppingCartService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  addToShoppingCart(product: Product) {
    console.log(product);
    this._shoppingCart.addItem(product);
    this._snackBar.open("Товар добавлен в корзину","x", {
      duration: 1000,
    });
  }
}

