import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private snackBar: MatSnackBar) { }

  openSnackBar(message: string, action: string, timeout: number) {
    this.snackBar.open(message, action, {
      duration: timeout,
    });
  }
}
