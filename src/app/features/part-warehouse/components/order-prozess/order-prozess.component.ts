import {Component} from '@angular/core';

@Component({
  selector: 'app-order-prozess',
  template: `
    <mat-tab-group style="width: 80% !important;">
      <mat-tab label="Bestellen">
        <app-part-order-page></app-part-order-page>
      </mat-tab>
      <mat-tab label="Warenkorb">
        <app-order-corb></app-order-corb>
      </mat-tab>
    </mat-tab-group>`,
})
export class OrderProzessComponent {
}
