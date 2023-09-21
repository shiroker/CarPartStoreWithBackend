import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {DataService} from '../../../../service/data.service';
import {DataListGrid} from '../../../../shared/components/data-list-grid/data-list-grid.component';
import {map} from 'rxjs/operators';
import {DropDownItem} from '../../../../shared/components/drop-down/drop-down.component';
import {PartStoreActions} from '../../store/part-store.actions';
import {PartStoreSelectors} from '../../store/part-store.selectors';
import {CarPart} from '../../../../service/data';
import {DataConverterService} from '../../../../service/dataConverterService';
import {FcCarPart} from '../../../../../../api';

@Component({
  selector: 'app-part-store-view',
  templateUrl: './part-store-view.component.html',
  styleUrls: ['./part-store-view.component.css']
})
export class PartStoreViewComponent implements OnInit {
  allCarParts$: Observable<CarPart[]>;
  allCarPartsForDataTable$: Observable<DataListGrid<CarPart>[]>;
  searchValue = '';
  allCarPartTypes$: Observable<DropDownItem<string>[]>;
  carPartTypePlaceholder = 'Teil-Art Auswählen';
  isShopMode = true;
  loadAllDataLoading$: Observable<boolean>;

  constructor(private store: Store, private service: DataService, private dataConverterService: DataConverterService) {
    this.store.dispatch(PartStoreActions.loadCarParts());
    this.allCarParts$ = this.store.select(PartStoreSelectors.selectAllCarParts);
    this.loadAllDataLoading$ = this.store.select(PartStoreSelectors.selectCarPartsLoading);
    this.allCarPartsForDataTable$ = this.getDataListGridTiles();
    this.allCarPartTypes$ = this.dataConverterService.getAllCarPartTypesExistInDataForDropDown();
  }

  private getDataListGridTiles() {
    return this.service.getAllCarParts().pipe(
      map(dataList => this.mapToDataListGrid(dataList))
    );
  }

  ngOnInit(): void {
  }

  private mapToDataListGrid(carParts: FcCarPart[]): DataListGrid<FcCarPart>[] {
    return carParts.map(carPart => {
      const dataListGrid: DataListGrid<FcCarPart> = {
        title: carPart.name + '\n' + carPart.carMarke.toString() + '\n' + carPart.price.toString().replace('.', ',') + ' €',
        color: 'lightblue',
        payload: carPart
      };
      return dataListGrid;
    });
  }

  carPartTypeChange(dataType: string): void {
    this.allCarPartsForDataTable$ = this.getDataListGridTiles().pipe(
      map(all => this.filterCartPartsByType(all, dataType))
    );
    this.carPartTypePlaceholder = dataType;
  }

  private filterCartPartsByType(allParts: DataListGrid<CarPart>[], type: string): DataListGrid<CarPart>[] {
    if (type === 'SONSTIGES') {
      return allParts;
    }
    return allParts.filter(part => part.payload.carPartType === type);
  }

  decrementQuantityOfCarPart(carPart: FcCarPart): void {
    const carPartId = carPart.id;
    const updated: FcCarPart = this.decrementQuantity(carPart);
    this.store.dispatch(PartStoreActions.updateCarPartById({carPartId, carPart: updated}));
  }

  private decrementQuantity(carPart: FcCarPart): FcCarPart {
    const newPartQuantity = carPart.quantity === 1?  carPart.quantityLimit : carPart.quantity - 1;
    const newPartPackageCount = carPart.quantity === 1?  carPart.packageCount - 1 : carPart.packageCount;

    return {
      ...carPart,
      quantity: newPartQuantity,
      packageCount: newPartPackageCount
    };
  }

}
