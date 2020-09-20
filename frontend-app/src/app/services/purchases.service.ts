import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PurchasesService {

  private endpoint = environment.API_URL;
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  // Error handling
  errorMgmt(error: HttpErrorResponse) {
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

  // Fetch Purchase Orders
  getPurchases(): Observable<any> {
    const url = `${this.endpoint}/purchases`;
    return this.http.get(url, { headers: this.headers })
      .pipe(
        catchError(this.errorMgmt)
      );
  }

  // Fetch purchase order details by PO_No
  getPurchaseOrderById(id: string): Observable<any> {
    const url = `${this.endpoint}/purchases/${id}`;
    return this.http.get(url, { headers: this.headers })
      .pipe(
        catchError(this.errorMgmt)
      );
  }

  // Fetch purchase info by item name
  getPurchaseByItemName(name: string): Observable<any> {
    const url = `${this.endpoint}/purchaseOrdersByItemName`;
    const body = { value: name };
    return this.http.post(url, body, { headers: this.headers })
      .pipe(
        catchError(this.errorMgmt)
      );
  }

  // Place a purchase order
  placePurchaseorder(orderDetails: any): Observable<any> {
    const url = `${this.endpoint}/purchases/create`;
    const body = { values: orderDetails };
    return this.http.post(url, body, { headers: this.headers })
      .pipe(
        catchError(this.errorMgmt)
      );
  }
}
