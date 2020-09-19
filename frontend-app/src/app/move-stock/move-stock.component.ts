import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
import { ItemsService } from '../services/items.service';
import { LocationsService } from '../services/locations.service';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-move-stock',
  templateUrl: './move-stock.component.html',
  styleUrls: ['./move-stock.component.css']
})
export class MoveStockComponent implements OnInit {

  moveStockForm: FormGroup;
  locationOptions: any = [];
  parentData: any;
  constructor(
    private fb: FormBuilder,
    private ls: LocationsService,
    private ms: MessageService,
    private its: ItemsService,
    @Inject(MAT_DIALOG_DATA) data

  ) { this.parentData = data; }

  ngOnInit() {
    this.initLocationOptions();
    this.initForm();
  }

  handleError(controlName: string, errorName: string) {
    return this.moveStockForm.get(controlName).hasError(errorName);
  }

  initForm() {
    this.moveStockForm = this.fb.group({
      location: ['', [Validators.required]],
      quantity: ['', [Validators.required, Validators.pattern(/^\d+$/), Validators.min(1)]]
    });
  }

  initLocationOptions() {
    this.ls.getLocations().subscribe(data => {
      if (data.success) {
        this.locationOptions = data.result;
      }
    });
  }

  moveStockItem(value) {
    const body = {
      stockId: this.parentData.stockId,
      fromLocationId: this.parentData.fromLocationId,
      toLocationId: value.location,
      quantity: Number(value.quantity)
    };
    console.log(body);

    this.its.moveStockItem(body).subscribe(data => {
      if (data.success) {
        this.ms.openSnackBar('Stock Item Moved Successfully. Reloading Page . . .', 'OK', 3000);
        setTimeout(() => {
        window.location.reload();
        }, 3000);
      } else {
        this.ms.openSnackBar(data.message, 'OK', 5000);
      }
    });
  }

}
