import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent, ConfirmDialogData } from './confirm-dialog.component';

@Injectable({ providedIn: 'root' })
export class ConfirmDialogService {
  private dialog = inject(MatDialog);

  open(data: ConfirmDialogData): Observable<boolean> {
    return this.dialog.open(ConfirmDialogComponent, {
      data,
      width: '420px',
      panelClass: 'pgs-dialog-panel',
      autoFocus: 'dialog',
      restoreFocus: true
    }).afterClosed();
  }

  danger(title: string, message: string, confirmLabel = 'Delete'): Observable<boolean> {
    return this.open({ title, message, confirmLabel, danger: true });
  }
}
