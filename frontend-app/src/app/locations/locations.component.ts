import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { LocationsService } from '../services/locations.service';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {

  locationsData: any = [];
  dataSource: MatTableDataSource<any>;
  @ViewChild('MatPaginator', { static: false }) paginator: MatPaginator;
  displayedColumns: string[] = ['location_id', 'location_name'];

  constructor(
    private ls: LocationsService,
    private ms: MessageService,
    private router: Router
  ) {
    this.ls.getLocations().subscribe(data => {
      if (data.success) {
        this.locationsData = data.result;
        this.dataSource = new MatTableDataSource<any>(this.locationsData);
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
        }, 0);
      } else {
        this.ms.openSnackBar(data.message, 'OK', 5000);
      }
    });
  }

  deleteLocation(element: any) {
    this.ls.deleteLocation(element.location_id).subscribe(data => {
      if (data.success) {
        this.ms.openSnackBar('Location deleted successfully. Reloading page ...', 'OK', 3000);
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
