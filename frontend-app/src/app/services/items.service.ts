import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

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

  // Fetch items
  getItems(): Observable<any> {
    const url = `${this.endpoint}/items`;
    return this.http.get(url, { headers: this.headers })
      .pipe(
        catchError(this.errorMgmt)
      );
  }

  // Add new item
  addNewItem(name: string): Observable<any> {
    const body = { value: name };
    const url = `${this.endpoint}/items/create`;
    return this.http.post(url, body, { headers: this.headers })
      .pipe(
        catchError(this.errorMgmt)
      );
  }

  // Delete an item
  deleteItem(id: number): Observable<any> {
    const url = `${this.endpoint}/items/${id}`;
    return this.http.delete(url, { headers: this.headers })
      .pipe(
        catchError(this.errorMgmt)
      );
  }

  // Fetch stock
  getStock(): Observable<any> {
    const url = `${this.endpoint}/stock`;
    return this.http.get(url, { headers: this.headers })
      .pipe(
        catchError(this.errorMgmt)
      );
  }

  // Fetch stock by item id
  getStockById(id: string): Observable<any> {
    const url = `${this.endpoint}/stock/${id}`;
    return this.http.get(url, { headers: this.headers })
      .pipe(
        catchError(this.errorMgmt)
      );
  }

  // Fetch stock info by item name
  getStockByName(item: string): Observable<any> {
    const url = `${this.endpoint}/stockInfoByName`;
    const body = { value: item };
    return this.http.post(url, body, { headers: this.headers })
      .pipe(
        catchError(this.errorMgmt)
      );
  }

  // Delete stock item by item_id and location_name
  deleteStockById(id: string, lname: string): Observable<any> {
    const url = `${this.endpoint}/stock/${id}/${lname}`;
    return this.http.delete(url, { headers: this.headers })
      .pipe(
        catchError(this.errorMgmt)
      );
  }
  // Create a new stock item entry
  saveStockItem(body: any): Observable<any> {
    const url = `${this.endpoint}/stock/create`;
    return this.http.post(url, body, { headers: this.headers })
      .pipe(
        catchError(this.errorMgmt)
      );
  }

  // Move stock item from one location to another
  moveStockItem(body: any): Observable<any> {
    const url = `${this.endpoint}/stock/move`;
    return this.http.put(url, body, { headers: this.headers })
      .pipe(
        catchError(this.errorMgmt)
      );
  }
}
