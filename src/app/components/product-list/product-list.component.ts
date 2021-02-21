import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../types';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  @Input() categoryId: number;
  @Input() products: Product[];

  constructor(
  ) { }

  ngOnInit(): void {
  }

}
