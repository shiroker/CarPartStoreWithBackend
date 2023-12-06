import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {FcCarPart} from '../../../../../../api';
import {PartWarehouseSelectors} from '../../store/part-warehouse.selectors';
import {PartWarehouseActions} from '../../store/part-warehouse.actions';

@Component({
  selector: 'app-order-corb',
  templateUrl: './order-cart.component.html',
})
export class OrderCartComponent {
  allFromCart$: Observable<FcCarPart[]>;
  displayedColumns = ['name', 'price', 'quantityLimit', 'packageCount', 'action'];
  selection: any;
  isOrdered$: Observable<boolean> = of(false);
  totalPrice$: Observable<number>;

  constructor(private store: Store) {
    this.allFromCart$ = this.store.select(PartWarehouseSelectors.selectPartsToOrder);
    this.isOrdered$ = this.store.select(PartWarehouseSelectors.selectIsOrdered);
    this.totalPrice$ = this.store.select(PartWarehouseSelectors.selectTotalPrice);
  }

  deleteItem(carPart: FcCarPart): void {
    if (carPart) {
      this.store.dispatch(PartWarehouseActions.deleteFromOrder({carPart}));
    }
  }

  orderAll() {
    this.store.dispatch(PartWarehouseActions.orderCarParts());
  }
}
