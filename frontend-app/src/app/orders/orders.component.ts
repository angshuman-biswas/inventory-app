import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MessageService } from '../services/message.service';
import { PurchasesService } from '../services/purchases.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {

  purchaseOrderData: any = [];
  dataSource: MatTableDataSource<any>;
  @ViewChild('MatPaginator', { static: false }) paginator: MatPaginator;
  displayedColumns: string[] = ['PO_No', 'item_count', 'items', 'action'];

  constructor(
    private ps: PurchasesService,
    private ms: MessageService,
  ) {
    this.ps.getPurchases().subscribe(data => {
      if (data.success) {
        this.purchaseOrderData = data.result;
        this.dataSource = new MatTableDataSource<any>(this.purchaseOrderData);
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
        }, 0);
      } else {
        this.ms.openSnackBar(data.message, 'OK', 5000);
      }
    });
  }

  doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  ngOnInit() {
  }

}
