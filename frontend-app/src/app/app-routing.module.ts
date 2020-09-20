import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddItemComponent } from './add-item/add-item.component';
import { AddLocationComponent } from './add-location/add-location.component';
import { AddOrderComponent } from './add-order/add-order.component';
import { AddStockComponent } from './add-stock/add-stock.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ItemsComponent } from './items/items.component';
import { LocationsComponent } from './locations/locations.component';
import { MiscQueriesComponent } from './misc-queries/misc-queries.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrdersComponent } from './orders/orders.component';
import { StockDetailsComponent } from './stock-details/stock-details.component';
import { StockComponent } from './stock/stock.component';


const routes: Routes = [
  { path: '', component: StockComponent },
  { path: 'stock-list', component: StockComponent },
  { path: 'stock-details/:item_id', component: StockDetailsComponent },
  { path: 'stock-list/add', component: AddStockComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'order-details/:PO_No', component: OrderDetailsComponent },
  { path: 'orders/add', component: AddOrderComponent },
  { path: 'items', component: ItemsComponent },
  { path: 'items/add', component: AddItemComponent },
  { path: 'locations', component: LocationsComponent },
  { path: 'locations/add', component: AddLocationComponent },
  { path: 'queries', component: MiscQueriesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
