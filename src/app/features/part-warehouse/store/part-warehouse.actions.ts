import {createAction, props} from '@ngrx/store';
import {FcCarPart} from '../../../../../api';

export const PartWarehouseActions= {
  loadCarPartsForOrdering: createAction('[CarWarehouseState] load all carParts'),
  loadCarPartsForOrderingSuccess: createAction('[CarWarehouseState] load all carParts success', props<{ carParts: FcCarPart[] }>()),
  loadCarPartsForOrderingFailed: createAction('[CarWarehouseState] load all carParts failed'),

  addPartToWareCorp: createAction('[CarWarehouseState] add carPart to ware corp', props<{carPart: FcCarPart, orderedCount: number}>()),
  deleteFromOrder: createAction('[CarWarehouseState] delete carPart from ware corp', props<{carPart: FcCarPart}>()),

  orderCarParts: createAction('[CarWarehouseState] order carParts'),
  orderCarPartsSuccess: createAction('[CarWarehouseState] load all carParts success', props<{ carParts: FcCarPart[]}>()),
  orderCarPartsFailed: createAction('[CarWarehouseState] load all carParts failed'),
}
