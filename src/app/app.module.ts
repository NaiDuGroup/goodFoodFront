import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { 
  FooterComponent, 
  HeaderComponent, 
  MenuComponent, 
  ProductListComponent, 
  SlideShowComponent,
  ProductCardComponent,
  ShoppingCartComponent
} from './components';
import { CartDialogComponent } from './components/cart-dialog/cart-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SlideShowComponent,
    ProductListComponent,
    FooterComponent,
    MenuComponent,
    ProductCardComponent,
    ShoppingCartComponent,
    CartDialogComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
