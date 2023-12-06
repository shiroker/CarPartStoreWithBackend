import {FcCarPart} from '../../../../../api';

export interface PartWarehouseState {
  carParts: FcCarPart[];
  carPartsLoading: boolean;
  carPartsInWareCorp: FcCarPart[],
  carPartsToOrder: FcCarPart[]
  totalPrice: number,
}

export function defaultPartWarehouseState(): PartWarehouseState {
  return {
    carParts: [],
    carPartsLoading: false,
    carPartsInWareCorp: [],
    carPartsToOrder: [],
    totalPrice: 0
  }
}
