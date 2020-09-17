import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from '../services/message.service';
import { PurchasesService } from '../services/purchases.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  orderItems: any = [];
  poNumber: string;
  dataSource: MatTableDataSource<any>;
  @ViewChild('MatPaginator', { static: false }) paginator: MatPaginator;
  displayedColumns: string[] = ['item_name', 'quantity'];
  constructor(
    private ps: PurchasesService,
    private ms: MessageService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.poNumber = this.activatedRoute.snapshot.paramMap.get('PO_No');
    this.ps.getPurchaseOrderById(this.poNumber).subscribe(data => {
      if (data.success) {
        this.orderItems = data.result;
        this.dataSource = new MatTableDataSource<any>(this.orderItems);
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
        }, 0);
      } else {
        this.ms.openSnackBar(data.message, 'OK', 5000);
      }
    });
  }

  ngOnInit() {
  }

}
