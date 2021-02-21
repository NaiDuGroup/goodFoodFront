import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import { Product } from '../types';

@Injectable({
  providedIn: 'root'
})

export class ShoppingCartService {
  
  totalPrice: number = 0;
  cartItems: Product[] = [];

  productCountMap: {} = {};
  cartItemsToDisplay: Product[] = [];


  private _totalPrice = new BehaviorSubject<number>(this.totalPrice);
  private _cartItems = new BehaviorSubject<Product[]>(this.cartItems);
  private _cartItemsToDisplay = new BehaviorSubject<Product[]>(this.cartItemsToDisplay);
  private _productCountMap = new BehaviorSubject<{}>(this.productCountMap);

  constructor() { }

  addItem(product: Product) {
    this.cartItems.push(product);
    this.totalPrice += product.itemPrice;

    this._cartItemsToDisplay.next(this.prepareToDisplay(this.cartItems));
    this._productCountMap.next(this.prepareProductCountMap(this.cartItems));
    this._totalPrice.next(this.totalPrice);
  }

  deleteItem(product: Product) {
    const tempP = this.cartItems.length;
    this.cartItems = this.cartItems.filter(item => item.itemId != product.itemId );
    const tempN = this.cartItems.length; 

    this.totalPrice = this.totalPrice - (product.itemPrice * (tempP - tempN));

    this._cartItems.next(this.cartItems);
    this._cartItemsToDisplay.next(this.prepareToDisplay(this.cartItems));
    this._productCountMap.next(this.prepareProductCountMap(this.cartItems));
    this._totalPrice.next(this.totalPrice);
  }

  deleteOneItem(product: Product): void {
    let tempId = 0;
    for (let i=0; i < this.cartItems.length; i++)
    {
      if (this.cartItems[i].itemId == product.itemId) {
        tempId = i;
      } 
    }

    if (tempId >= 0) {
      this.cartItems.splice(tempId,1);
    }
    this.totalPrice -= product.itemPrice;

    this._cartItems.next(this.cartItems);
    this._totalPrice.next(this.totalPrice);
    this._cartItemsToDisplay.next(this.prepareToDisplay(this.cartItems));
    this._productCountMap.next(this.prepareProductCountMap(this.cartItems));

  }

  getTotalPriceOfItems(): Observable<number> {
    return this._totalPrice.asObservable();
  }

  getCartItems(): Observable<Product[]> {
    return this._cartItems.asObservable();
  }

  getCartItemsToDisplay(): Observable<Product[]> {
    return this._cartItemsToDisplay.asObservable();
  }

  getProductCountMap(): Observable<{}> {
    return this._productCountMap.asObservable();
  }

  prepareProductCountMap(cartItems: Product[]): {} {
    return this.cartItems.reduce((acc, curr) => {
      if (!acc[curr.itemId]) {
      acc[curr.itemId] = 0
      }
      
      acc[curr.itemId] += 1;
      
      return acc;
      }, {});
  }

  prepareToDisplay(cartItems: Product[]): Product[] {
    return this.cartItems.reduce((acc, curr) => {
      if (acc.find((el) => el.itemId === curr.itemId)) { 
      return acc;
      }
      
      acc.push(curr);
      
      return acc;
      }, []);
  }

}
