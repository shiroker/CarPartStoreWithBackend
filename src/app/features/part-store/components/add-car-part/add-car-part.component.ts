import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {DropDownItem} from '../../../../shared/components/drop-down/drop-down.component';
import {DataConverterService} from '../../../../service/dataConverterService';
import {Store} from '@ngrx/store';
import {PartStoreActions} from '../../store/part-store.actions';
import {FcCarMarke, FcCarPart, FcCarPartType} from '../../../../../../api';
import {CustomFormValidationErrors, CustomFormValidators} from '../../../../utilities/validators/form-validators';
import {collectAllFormErrors} from '../../../../../index';

@Component({
  selector: 'app-add-car-part',
  templateUrl: './add-car-part.component.html',
  styleUrls: ['./add-car-part.component.css']
})
export class AddCarPartComponent implements OnInit {

  formGroup: FormGroup = new FormGroup({});

  allCarPartTypes$: Observable<DropDownItem<FcCarPartType>[]>;
  allCarMarke$: Observable<DropDownItem<FcCarMarke>[]>;
  carPartTypePlaceholder = FcCarPartType.Sonstiges;
  carMarkePlaceholder = FcCarMarke.Sonstiges;
  private validationErrors: CustomFormValidationErrors[] = [];
  formValid = true;

  constructor(private formBuilder: FormBuilder,
              private store: Store,
              private dataConverterService: DataConverterService) {
    this.allCarPartTypes$ = this.dataConverterService.getAllCarPartTypesForDropDown();
    this.allCarMarke$ = this.dataConverterService.getAllCarMarkeForDropDown();
  }

  onAddClicked(): void {
    if (this.formGroup.valid){
      let carPart: FcCarPart = {
        name: this.formGroup.get('name')?.value,
        carModel: this.formGroup.get('model')?.value,
        quantity: this.formGroup.get('quantity')?.value,
        quantityLimit: this.formGroup.get('quantityLimit')?.value,
        packageCount: this.formGroup.get('packageCount')?.value,
        carPartType: this.carPartTypePlaceholder,
        price: this.formGroup.get('price')?.value,
        carMarke: this.carMarkePlaceholder,
        id: -1,
        rabatt: 1,
        barCode: '',
        totalWeightInKg: 1,
        volumeInCube: 0.2
      };
      if (!carPart.quantity){
        carPart = {...carPart, quantity: carPart.quantityLimit, packageCount: carPart.packageCount >0 ? carPart.packageCount - 1 : 0}
      }
      this.store.dispatch(PartStoreActions.addCarPart({carPart}));
      this.formValid = true;
    }else {
      this.formValid = false;
    }
  }

  ngOnInit(): void {
    this.recreateForm();
  }

  private recreateForm() {
    this.formGroup = this.formBuilder.group({
      name: new FormControl({value: '', disabled: false}, [
        CustomFormValidators.containsSemicolonValidator('Name'),
      CustomFormValidators.containsCommaValidator('Name')]),
      model: new FormControl({value: '', disabled: false}, []),
      quantityLimit: new FormControl({value: '', disabled: false}, [
        CustomFormValidators.maxValueValidator('Enthaltene Anzahl', 10)
      ]),
      quantity: new FormControl({value: '', disabled: false}, [
        CustomFormValidators.maxValueValidator('Anzahl', 10)
      ]),
      packageCount: new FormControl({value: '', disabled: false}, [
        CustomFormValidators.maxValueValidator('Packet-Anzahl', 5)
      ]),
      price: new FormControl({value: '', disabled: false}, [])
    });
  }

  carPartTypeChange(partType: FcCarPartType): void {
    this.carPartTypePlaceholder = partType;
  }

  carMarkeChange(carMarke: FcCarMarke): void {
    this.carMarkePlaceholder = carMarke;
  }
  collectErrors(formGroup: FormGroup): CustomFormValidationErrors[]{
    return formGroup ? collectAllFormErrors(formGroup) : this.validationErrors;
  }

  private organizeQuantity(carPart: FcCarPart): FcCarPart {
    if (!carPart.quantity){
      carPart = {...carPart, quantity: carPart.quantityLimit, packageCount: carPart.packageCount >0 ? carPart.packageCount - 1 : 0}
    }
    return carPart;
  }
}
