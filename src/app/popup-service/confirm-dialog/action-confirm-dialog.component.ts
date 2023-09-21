import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmData, ConfirmDialogComponent} from './confirm-dialog.component';

@Component({
  selector: 'app-action-confirm-dialog',
  template: `
    <button mat-raised-button [matTooltip]="confirmButtonLabel" color="warn"
            (click)="onClick()">{{confirmButtonLabel}}</button>`,
})
export class ActionConfirmDialogComponent {
  @Input()
  idOfElement = 0;
  @Input()
  dataName = '';
  @Input()
  acceptLabel = 'CONFIRM_DELETE.CONFIRM';
  @Input()
  hintText = 'Wollen Sie es wirklich Löschen ?';
  @Input()
  itemName = '';
  @Input()
  cancelLabel = 'CONFIRM_DELETE.CANCEL';
  @Input()
  headerTitle = 'Löschen des Elements';
  @Input()
  confirmButtonLabel = '';
  @Output()
  acceptButtonClicked = new EventEmitter<number>();

  constructor(public dialog: MatDialog) {
  }

  onClick(): void {
    const confirmData: ConfirmData = {
      itemName: this.itemName,
      confirmLabel: this.acceptLabel,
      hintText: this.hintText,
      cancelLabel: this.cancelLabel,
      headerTitle: this.headerTitle,
      idOfItem: this.idOfElement
    };
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: confirmData
    });

    dialogRef.afterClosed().subscribe(result => {
      const idOfElement: number = Number(result);
      if (idOfElement && idOfElement > 0) {
        this.acceptButtonClicked.emit(idOfElement);
      }
    });
  }

}

