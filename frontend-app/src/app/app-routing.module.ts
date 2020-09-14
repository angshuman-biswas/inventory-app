import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { OrdersComponent } from './orders/orders.component';
import { StockComponent } from './stock/stock.component';


const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'stock-list', component: StockComponent },
  { path: 'orders', component: OrdersComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
