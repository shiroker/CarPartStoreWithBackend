import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Store} from '@ngrx/store';
import {PartStoreActions} from '../../store/part-store.actions';
import {PartStoreSelectors} from '../../store/part-store.selectors';
import {TableData} from '../../../../shared/components/data-table/data-table.component';
import {map} from 'rxjs/operators';
import {FcCarPart} from '../../../../../../api';

@Component({
  selector: 'app-car-part-administration',
  templateUrl: './car-part-administration.component.html',
  styleUrls: ['./car-part-administration.component.css']
})
export class CarPartAdministrationComponent implements OnInit {
  @Output()
  public toggleAddItemMenu = new EventEmitter();
  carParts$: Observable<FcCarPart[]> = of([]);
  rareElements$: Observable<number>;
  allParts$: Observable<TableData<FcCarPart>[]>;
  dataColumns: string[] = ['id', 'name', 'description', 'price', 'quantity', 'quantityLimit', 'packageCount', 'totalWeightInKg', 'action'];
  loadAllDataLoading$: Observable<boolean>;


  constructor(private store: Store) {

    this.loadAllDataLoading$ = this.store.select(PartStoreSelectors.selectCarPartsLoading);
    this.carParts$ = this.store.select(PartStoreSelectors.selectAllCarParts);
    this.rareElements$ = this.store.select(PartStoreSelectors.selectRareElements);
    this.allParts$ = this.loadData();
  }

  private loadData() {
    return this.carParts$.pipe(
      map(parts => this.mapToDataTable(parts))
    );
  }

  ngOnInit(): void {
    this.store.dispatch(PartStoreActions.loadCarParts());
    this.store.dispatch(PartStoreActions.setRareElements());
  }

  private mapToDataTable(parts: FcCarPart[]): TableData<FcCarPart>[] {
    return parts.map(part => {
      const result: TableData<FcCarPart> = {
        id: part.id,
        name: part.name,
        description: this.writeDescriptionFor(part),
        totalPrice: `${part.price.toFixed(2).toString().replace('.', ',')} €`,
        weight: `${part.totalWeightInKg.toString().replace('.', ',')} kg`,
        quantity: part.quantity,
        quantityLimit: part.quantityLimit,
        packageCount: part.packageCount,
        payload: part
      };
      return result;
    });
  }

  private writeDescriptionFor(part: FcCarPart): string {
    if (part.carMarke.toString() && part.carModel) {
      const isSonstiges = part.carModel.toUpperCase() === 'SONSTIGES'.toUpperCase();
      return isSonstiges ? `${part.name} Sonstiges` : `${part.name} ${part.carMarke} ${part.carModel}`;
    }
    return '';
  }

  onGenerateRabat(tableRow: TableData<FcCarPart>, percent: string): void {
    this.store.dispatch(PartStoreActions.updateCarPartById({carPartId: tableRow.id, carPart: this.calculatePriceFor(tableRow.payload, percent)}));
  }

  onRemove(carPartId: number): void {
    this.store.dispatch(PartStoreActions.deleteCarPartById({carPartId}));
  }

  private calculatePriceFor(carPart: FcCarPart, percent: string): FcCarPart {
    const newRabatt = parseFloat(percent) ? parseFloat(percent) / 100: 0;
    return {
      ...carPart,
      rabatt: newRabatt,
      price: carPart.price * (1- newRabatt)
    };
  }

  getHintText(): string {
    return `DELETE_HINT_TEXT`;
  }

}
