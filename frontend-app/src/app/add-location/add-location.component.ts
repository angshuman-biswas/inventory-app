import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocationsService } from '../services/locations.service';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.css']
})
export class AddLocationComponent implements OnInit {

  locationName: string;
  constructor(
    private ls: LocationsService,
    private router: Router,
    private ms: MessageService
  ) { }

  ngOnInit() {
  }

  saveLocation() {
    this.ls.addLocation(this.locationName).subscribe(data => {
      if (data.success) {
        this.router.navigateByUrl('/locations');
        this.ms.openSnackBar('Location Added Successfully', 'OK', 3000);
      }
    });
  }

}
