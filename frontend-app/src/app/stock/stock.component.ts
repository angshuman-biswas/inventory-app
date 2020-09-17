import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ItemsService } from '../services/items.service';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {

  stockData: any = [];
  dataSource: MatTableDataSource<any>;
  @ViewChild('MatPaginator', { static: false }) paginator: MatPaginator;
  displayedColumns: string[] = ['item_name', 'location_name', 'quantity', 'action'];


  constructor(
    private its: ItemsService,
    private ms: MessageService,
  ) {
    this.its.getStock().subscribe(data => {
      if (data.success) {
        this.stockData = data.result;
        this.dataSource = new MatTableDataSource<any>(this.stockData);
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
