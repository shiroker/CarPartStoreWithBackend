import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {PartOrderPageComponent} from './components/part-order-page/part-order-page.component';
import {CartPartWarehouseReducer} from './store/part-warehouse.reducer';
import {CarPartWarehouseEffects} from './store/part-warehouse.effects';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTooltipModule} from '@angular/material/tooltip';
import {SharedModule} from '../../shared/shared.module';
import { OrderProzessComponent } from './components/order-prozess/order-prozess.component';
import {MatTabsModule} from '@angular/material/tabs';
import { OrderCartComponent } from './components/order-corb/order-cart.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {TranslateModule} from '@ngx-translate/core';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  declarations: [PartOrderPageComponent, OrderProzessComponent, OrderCartComponent],
  imports: [
    CommonModule,
    FormsModule,
    StoreModule.forRoot(CartPartWarehouseReducer),
    EffectsModule.forFeature([CarPartWarehouseEffects]),
    StoreModule.forFeature('partWarehouseStore', CartPartWarehouseReducer),
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    ReactiveFormsModule,
    SharedModule,
    MatTabsModule,
    MatButtonToggleModule,
    TranslateModule,
    MatTableModule,
  ],
  exports: [
    PartOrderPageComponent,
    OrderProzessComponent
  ]
})
export class PartWarehouseModule {
}
