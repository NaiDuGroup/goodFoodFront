import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GoodFoodService } from '../../servicies'
import { Product } from 'src/app/types';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  soupCategoryProducts$: Observable<Product[]>;
  hotMealCategoryProducts$: Observable<Product[]>;
  breakfastCategoryProducts$: Observable<Product[]>;
  dessertCategoryProducts$: Observable<Product[]>;

  constructor(
    private _service: GoodFoodService
  ) { }

  ngOnInit(): void {
    this.soupCategoryProducts$ = this._service.getProductsByCategory(1);
    this.hotMealCategoryProducts$ = this._service.getProductsByCategory(2);
    this.breakfastCategoryProducts$ = this._service.getProductsByCategory(3);
    this.dessertCategoryProducts$ = this._service.getProductsByCategory(4);
  }

}
