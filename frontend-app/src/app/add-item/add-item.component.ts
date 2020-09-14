import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemsService } from '../services/items.service';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
  itemName: string;
  constructor(
    private its: ItemsService,
    private router: Router,
    private ms: MessageService
  ) { }

  saveItem() {
    this.its.addNewItem(this.itemName).subscribe(data => {
      console.log(data);
      if (data.success) {
        this.router.navigateByUrl('/items');
        this.ms.openSnackBar('Item Added Successfully', 'OK', 5000);
      }
    });
  }

  ngOnInit() {
  }

}
