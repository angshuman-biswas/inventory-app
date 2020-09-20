import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ItemsService } from '../services/items.service';
import { MessageService } from '../services/message.service';
import { PurchasesService } from '../services/purchases.service';

@Component({
  selector: 'app-misc-queries',
  templateUrl: './misc-queries.component.html',
  styleUrls: ['./misc-queries.component.css']
})
export class MiscQueriesComponent implements OnInit {

  itemName: string;
  itemName2: string;
  stockData: any = [];
  purchasedata: any = [];
  dataSource: MatTableDataSource<any>;
  dataSource2: MatTableDataSource<any>;
  @ViewChild('MatPaginator', { static: false }) paginator: MatPaginator;
  @ViewChild('MatPaginator', { static: false }) paginator2: MatPaginator;
  displayedColumns: string[] = ['location_name', 'quantity'];
  displayedColumns2: string[] = ['PO_No', 'quantity'];


  constructor(
    private its: ItemsService,
    private ps: PurchasesService,
    private ms: MessageService
  ) {
    this.itemName = '';
    this.itemName2 = '';
  }

  ngOnInit() {
  }

  execQuery1(itemName: string) {
    this.its.getStockByName(itemName).subscribe(data => {
      if (data.success) {
        this.stockData = data.result;
        this.dataSource = new MatTableDataSource<any>(this.stockData);
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
        }, 0);
      } else {
        this.ms.openSnackBar(data.message, 'OK', 3000);
      }
    });
  }

  execQuery2(itemName: string) {
    this.ps.getPurchaseByItemName(itemName).subscribe(data => {
      if (data.success) {
        console.log(data.result);
        this.purchasedata = data.result;
        this.dataSource2 = new MatTableDataSource<any>(this.purchasedata);
        setTimeout(() => {
          this.dataSource2.paginator = this.paginator2;
        }, 0);
      } else {
        this.ms.openSnackBar(data.message, 'OK', 3000);
      }
    });
  }

}
