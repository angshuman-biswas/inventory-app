import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ItemsService } from '../services/items.service';
import { LocationsService } from '../services/locations.service';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.css']
})
export class AddStockComponent implements OnInit {

  stockItemForm: FormGroup;
  itemOptions: any = [];
  locationOptions: any = [];
  constructor(
    private fb: FormBuilder,
    private its: ItemsService,
    private ms: MessageService,
    private ls: LocationsService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.initItemOptions();
    this.initLocationOptions();
    this.initForm();
  }

  handleError(controlName: string, errorName: string) {
    return this.stockItemForm.get(controlName).hasError(errorName);
  }

  initForm() {
    this.stockItemForm = this.fb.group({
      item: ['', [Validators.required]],
      location: ['', [Validators.required]],
      quantity: ['', [Validators.required, Validators.pattern(/^\d+$/), Validators.min(1)]]
    });
  }

  initItemOptions() {
    this.its.getItems().subscribe(data => {
      if (data.success) {
        this.itemOptions = data.result;
      }
    });
  }

  initLocationOptions() {
    this.ls.getLocations().subscribe(data => {
      if (data.success) {
        this.locationOptions = data.result;
      }
    });
  }

  saveStockItem(value) {
    const body = {
      stockId: value.item,
      locationId: value.location,
      quantity: Number(value.quantity)
    };

    this.its.saveStockItem(body).subscribe(data => {
      if (data.success) {
        this.ms.openSnackBar('Item Added Successfully', 'OK', 5000);
        setTimeout(() => {
          this.router.navigateByUrl('/stock-list');
        }, 1000);
      } else {
        this.ms.openSnackBar(data.message, 'OK', 5000);
      }
    });
  }

  onSelectedItemChange(event) {
  }

  onSelectedLocationChange(event) {
  }

}
