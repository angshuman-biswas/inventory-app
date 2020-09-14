import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  private endpoint = 'http://localhost:9090';
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
}
