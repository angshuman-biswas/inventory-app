import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddItemComponent } from './add-item/add-item.component';
import { AddOrderComponent } from './add-order/add-order.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ItemsComponent } from './items/items.component';
import { LocationsComponent } from './locations/locations.component';
import { OrdersComponent } from './orders/orders.component';
import { StockComponent } from './stock/stock.component';


const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'stock-list', component: StockComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'orders/add', component: AddOrderComponent },
  { path: 'items', component: ItemsComponent },
  { path: 'items/add', component: AddItemComponent },
  { path: 'locations', component: LocationsComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
