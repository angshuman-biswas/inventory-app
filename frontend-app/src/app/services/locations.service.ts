import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  private endpoint = environment.API_URL;
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  // Error handling 
  private errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

  // Fetch locations
  getLocations(): Observable<any> {
    const url = `${this.endpoint}/locations`;
    return this.http.get(url, { headers: this.headers })
      .pipe(
        catchError(this.errorMgmt)
      );
  }

  // Add new location
  addLocation(locationName: string): Observable<any> {
    const url = `${this.endpoint}/locations/create`;
    const body = { value: locationName };
    return this.http.post(url, body, { headers: this.headers })
      .pipe(
        catchError(this.errorMgmt)
      );
  }

  // Update a location name
  updateLocation(value: any): Observable<any> {
    const url = `${this.endpoint}/locations/${value.id}`;
    const body = { value: value.newName };
    return this.http.put(url, body, { headers: this.headers })
      .pipe(
        catchError(this.errorMgmt)
      );
  }

  // Delete a locatiohn
  deleteLocation(id: any): Observable<any> {
    const url = `${this.endpoint}/locations/${id}`;
    return this.http.delete(url, { headers: this.headers })
      .pipe(
        catchError(this.errorMgmt)
      );
  }
}
