import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiGoodFoodGetProductsByCategoryId } from '../api';

@Injectable({
  providedIn: 'root'
})
export class GoodFoodService {

  constructor(
    private _http: HttpClient
  ) { }

  getProductsByCategory(category: number): Observable<any> {
    return this._http.get<Observable<any>>(apiGoodFoodGetProductsByCategoryId(), {
      params: {
        categoryId: category.toString()
      }
    })    
  }
}
