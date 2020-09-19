import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatPaginator, MatTableDataSource } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { MoveStockComponent } from '../move-stock/move-stock.component';
import { ItemsService } from '../services/items.service';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.css']
})
export class StockDetailsComponent implements OnInit {

  stockItems: any = [];
  dataSource: MatTableDataSource<any>;
  @ViewChild('MatPaginator', { static: false }) paginator: MatPaginator;
  displayedColumns: string[] = ['location_name', 'quantity', 'action'];

  constructor(
    private its: ItemsService,
    private ms: MessageService,
    private activatedRoute: ActivatedRoute,
    private matDialog: MatDialog
  ) {
    this.its.getStockById(this.activatedRoute.snapshot.paramMap.get('item_id')).subscribe(data => {
      if (data.success) {
        this.stockItems = data.result;
        this.dataSource = new MatTableDataSource<any>(this.stockItems);
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
        }, 0);
      } else {
        this.ms.openSnackBar(data.message, 'OK', 5000);
      }
    });
  }

  removeStockItem(element: any) {
    this.its.deleteStockById(element.item_id, element.location_name).subscribe(data => {
      if (data.success) {
        this.ms.openSnackBar('Stock item removed successfully', 'OK', 5000);
        this.ms.openSnackBar('Reloading page ...', 'OK', 1000);
        window.location.reload();
      } else {
        this.ms.openSnackBar(data.message, 'OK', 5000);
      }
    });
  }

  openDialog(element) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      stockId: element.item_id,
      fromLocationId: element.location_id
    };
    this.matDialog.open(MoveStockComponent, dialogConfig);
  }

  ngOnInit() {
  }

}
