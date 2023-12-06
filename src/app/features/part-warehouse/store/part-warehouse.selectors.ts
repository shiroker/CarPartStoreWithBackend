import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AppState} from '../../../core/app.state';
import {PartWarehouseState} from './part-warehouse.state';

const selectFeature = createFeatureSelector<AppState, PartWarehouseState>('partWarehouseStore');

export const PartWarehouseSelectors = {
  selectAllParts: createSelector(selectFeature, s1=> s1.carParts),
  selectAllPartLoading: createSelector(selectFeature, s1 => s1.carPartsLoading),
  selectPartsFromWareCorp: createSelector(selectFeature, s1 => s1.carPartsInWareCorp),
  selectPartsToOrder: createSelector(selectFeature, s1 => s1.carPartsToOrder),
  selectIsOrdered: createSelector(selectFeature, s1 => s1.carPartsInWareCorp.length > 0),
  selectTotalPrice: createSelector(selectFeature, s1 => s1.totalPrice)
}
