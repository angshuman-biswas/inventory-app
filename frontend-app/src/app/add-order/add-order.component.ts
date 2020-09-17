import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ItemsService } from '../services/items.service';
import { MessageService } from '../services/message.service';
import { PurchasesService } from '../services/purchases.service';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent implements OnInit {

  orderForm: FormGroup;
  itemOptions: any = [];
  availableUnits = 0;
  constructor(
    private fb: FormBuilder,
    private its: ItemsService,
    private ps: PurchasesService,
    private ms: MessageService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.initItemOptions();
    this.initForm();
  }

  get orders() {
    return this.orderForm.get('orders') as FormArray;
  }

  initForm() {
    // Initialize the form structure
    this.orderForm = this.fb.group({
      orders: this.fb.array([
        this.fb.group({
          item: new FormControl('', Validators.required),
          quantity: new FormControl('', [Validators.required, Validators.min(1)])
        })
      ])
    });
  }

  initItemOptions() {
    this.its.getItems().subscribe(data => {
      if (data.success) {
        this.itemOptions = data.result;
      }
    });
  }

  addOrderItem() {
    this.orders.push(this.fb.group({
      item: new FormControl('', Validators.required),
      quantity: new FormControl('', [Validators.required, Validators.min(1), Validators.pattern(/^\d+$/)])
    }
    ));
  }

  deleteOrderItem(index) {
    this.orders.removeAt(index);
  }

  onSelectedItemChange(event, index) {
    const stockItemId = event.value.toString();
    this.its.getStockById(stockItemId).subscribe(data => {
      if (data.success) {
        let tempSum = 0;
        data.result.forEach(val => tempSum = tempSum + val.quantity);
        this.availableUnits = tempSum;
        this.orders.at(index).get('quantity').setValidators(
          [Validators.max(tempSum), Validators.required, Validators.min(1), Validators.pattern(/^\d+$/)]);
      }
    });
  }

  handleError(controlName: string, index: number, errorName: string) {
    return this.orders.at(index).get(controlName).hasError(errorName);
  }

  submitOrderForm(value: any) {
    const requestBodyValues = [];
    value.orders.forEach(val => requestBodyValues.push([Number(val.item), Number(val.quantity)]));
    this.ps.placePurchaseorder(requestBodyValues).subscribe(data => {
      if (data.success) {
        this.ms.openSnackBar('Order placed Successfully', 'OK', 5000);
        setTimeout(() => {
          this.router.navigateByUrl('/orders');
        }, 1000);
      } else {
        this.ms.openSnackBar(data.message, 'OK', 5000);
      }
    });

  }

}
