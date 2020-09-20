import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { StockComponent } from './stock/stock.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatBadgeModule,
  MatSidenavModule,
  MatListModule,
  MatGridListModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatTableModule,
  MatPaginatorModule,
  MatSnackBarModule,
  MatDialogModule,
  MatTabsModule
} from '@angular/material';
import { OrdersComponent } from './orders/orders.component';
import { PurchasesService } from './services/purchases.service';
import { HttpClientModule } from '@angular/common/http';
import { AddOrderComponent } from './add-order/add-order.component';
import { ItemsComponent } from './items/items.component';
import { LocationsComponent } from './locations/locations.component';
import { AddItemComponent } from './add-item/add-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StockDetailsComponent } from './stock-details/stock-details.component';
import { ItemsService } from './services/items.service';
import { AddStockComponent } from './add-stock/add-stock.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { MessageService } from './services/message.service';
import { LocationsService } from './services/locations.service';
import { MoveStockComponent } from './move-stock/move-stock.component';
import { AddLocationComponent } from './add-location/add-location.component';
import { MiscQueriesComponent } from './misc-queries/misc-queries.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    StockComponent,
    OrdersComponent,
    AddOrderComponent,
    ItemsComponent,
    LocationsComponent,
    AddItemComponent,
    StockDetailsComponent,
    AddStockComponent,
    OrderDetailsComponent,
    MoveStockComponent,
    AddLocationComponent,
    MiscQueriesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatBadgeModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatDialogModule,
    MatTabsModule
  ],
  providers: [
    PurchasesService,
    ItemsService,
    MessageService,
    LocationsService
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [MoveStockComponent]
})
export class AppModule { }
