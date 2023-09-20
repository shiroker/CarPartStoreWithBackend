import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {FcCarPart} from '../../../api';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  BASE_URL: string = 'http://localhost:8080/api/carPart/';


  constructor(private http: HttpClient) {
  }

  getAllCarParts(): Observable<FcCarPart[]> {
    return this.http.get<FcCarPart[]>(this.BASE_URL).pipe(
      map(all => all.map(extracted))
    );
  }

  addCarPart(carPart: FcCarPart): Observable<FcCarPart> {
    return this.http.post<FcCarPart>(this.BASE_URL, carPart);
  }
  updateCarPart(oldPartId: number, carPart: FcCarPart): Observable<FcCarPart> {
    return this.http.put<FcCarPart>(this.BASE_URL + oldPartId, carPart);
  }

  deleteCarPart(carPartId: number): Observable<number> {
    return this.http.delete(this.BASE_URL + carPartId).pipe(
      map(() => carPartId)
    );
  }

  orderCarParts(carParts: FcCarPart[]): Observable<FcCarPart[]> {
    return this.http.patch<FcCarPart[]>(this.BASE_URL, carParts).pipe(
      map(all => all.map(extracted))
    );
  }
}

function extracted(carPart: FcCarPart): FcCarPart {
  return {
    name: carPart.name,
    id: carPart.id,
    carPartType: carPart.carPartType,
    carMarke: carPart.carMarke,
    carModel: carPart.carModel,
    barCode: carPart.barCode,
    price: carPart.price,
    rabatt: carPart.rabatt,
    volumeInCube: carPart.volumeInCube,
    totalWeightInKg: carPart.totalWeightInKg,
    quantity: carPart.quantity,
    quantityLimit: carPart.quantityLimit,
    packageCount: carPart.packageCount
  };
}
