import {NgModule} from '@angular/core';
import {PartStoreViewComponent} from './components/part-store-view/part-store-view.component';
import {AddCarPartComponent} from './components/add-car-part/add-car-part.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {SharedModule} from '../../shared/shared.module';
import {CarPartAdministrationComponent} from './components/car-part-administration/car-part-administration.component';
import {AsyncPipe, NgIf} from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {CartPartReducer} from './store/part-store.reducer';
import {PartStoreEffects} from './store/part-store.effects';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatInputModule} from '@angular/material/input';
import {RouterModule} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {MultiTranslateHttpLoader} from 'ngx-translate-multi-http-loader';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [
    PartStoreViewComponent,
    AddCarPartComponent,
    CarPartAdministrationComponent,
  ],
    imports: [
        FormsModule,
        MatButtonToggleModule,
        SharedModule,
        StoreModule.forRoot(CartPartReducer),
        EffectsModule.forFeature([PartStoreEffects]),
        StoreModule.forFeature('partStore', CartPartReducer),
        RouterModule.forChild([
            {
                path: '',
                component: CarPartAdministrationComponent,
            }
        ]),
        AsyncPipe,
        MatTableModule,
        NgIf,
        MatButtonModule,
        HttpClientModule,
        BrowserModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        MatTooltipModule,
        MatInputModule,
        ReactiveFormsModule,
        RouterModule,
        MatCardModule
    ],
  exports: [
    AddCarPartComponent,
    PartStoreViewComponent,
    CarPartAdministrationComponent,
  ]
})
export class PartStoreModule {
}
export function HttpLoaderFactory(http: HttpClient) {
  return new MultiTranslateHttpLoader(http, [
    {prefix: "./assets/translate/", suffix: ".json"}
  ]);
}
