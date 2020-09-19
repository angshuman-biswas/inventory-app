import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { ItemsService } from '../services/items.service';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  itemsData: any = [];
  dataSource: MatTableDataSource<any>;
  @ViewChild('MatPaginator', { static: false }) paginator: MatPaginator;
  displayedColumns: string[] = ['item_id', 'item_name', 'action'];

  constructor(
    private its: ItemsService,
    private ms: MessageService,
    private router: Router
  ) {
    this.its.getItems().subscribe(data => {
      if (data.success) {
        this.itemsData = data.result;
        this.dataSource = new MatTableDataSource<any>(this.itemsData);
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
        }, 0);
      } else {
        this.ms.openSnackBar(data.message, 'OK', 5000);
      }
    });
  }

  deleteItem(element: any) {
    console.log(element);
    this.its.deleteItem(element.item_id).subscribe(data => {
      if (data.success) {
        this.ms.openSnackBar('Item deleted successfully. Reloading page ...', 'OK', 3000);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        this.ms.openSnackBar(data.message, 'OK', 5000);
      }
    });
  }

  ngOnInit() {
  }

}
