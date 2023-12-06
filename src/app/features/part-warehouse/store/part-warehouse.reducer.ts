import {Action, createReducer, on} from '@ngrx/store';
import {defaultPartWarehouseState, PartWarehouseState} from './part-warehouse.state';
import {PartWarehouseActions} from './part-warehouse.actions';
import {FcCarPart} from '../../../../../api';

function addCarPartToWareCorp(state: PartWarehouseState, carPart: FcCarPart, orderedPackageCount: number): PartWarehouseState {
  if (carPart.quantity === 0){
    carPart = {...carPart, quantity: 1};
  }
  const carPartToOrder: FcCarPart = {...carPart, packageCount: orderedPackageCount};
  const carPartsToOrder = [...state.carPartsToOrder, carPartToOrder];
  carPart = {...carPart, packageCount: carPart.packageCount + orderedPackageCount};

  const totalPrice: number = {...state}.totalPrice + carPart.price * carPart.quantityLimit * orderedPackageCount;
  return {
    ...state,
    carPartsToOrder,
    carPartsInWareCorp: [...state.carPartsInWareCorp, carPart],
    totalPrice: Number(totalPrice.toFixed(2))
  };
}

function deleteCarPartFromWareCorp(state: PartWarehouseState, carPart: FcCarPart) {
  const carPartsToOrder = [...state.carPartsToOrder].filter(from => from.id !== carPart.id);
  const totalPrice =
    carPartsToOrder.length === 0 ? 0 : carPartsToOrder.map(c => c.price * c.quantityLimit*c.packageCount).reduce((a, b) => a + b);
  return {
    ...state,
    carPartsToOrder,
    totalPrice: Number(totalPrice.toFixed(2))
  }
}

const warehouseReducer = createReducer<PartWarehouseState, Action>(
  defaultPartWarehouseState(),
  on(PartWarehouseActions.loadCarPartsForOrdering, (state) => ({...state, carPartsLoading: true})),
  on(PartWarehouseActions.loadCarPartsForOrderingFailed, (state) => ({...state, carPartsLoading: false})),
  on(PartWarehouseActions.loadCarPartsForOrderingSuccess, (state, {carParts}) => ({...state, carParts, carPartsLoading: false})),
  on(PartWarehouseActions.addPartToWareCorp, (state, {carPart, orderedCount}) => addCarPartToWareCorp(state, carPart, orderedCount)),
  on(PartWarehouseActions.deleteFromOrder, (state, {carPart}) => deleteCarPartFromWareCorp(state, carPart)),
  on(PartWarehouseActions.orderCarParts, (state) => ({...state, carPartsLoading: true})),
  on(PartWarehouseActions.orderCarPartsSuccess, (state, {carParts}) => ({...state,carParts, carPartsLoading: false})),
  on(PartWarehouseActions.orderCarPartsFailed, (state) => ({...state, carPartsLoading: false}))
);

export function CartPartWarehouseReducer(partWarehouseState: PartWarehouseState, action: Action): PartWarehouseState {
  return warehouseReducer(partWarehouseState, action);
}
