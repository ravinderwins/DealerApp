import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StateFeatureKey } from '@app/entities';
import { PipesModule } from '@app/shared/pipes';
import { CustomFormsModule, DialogsModule, LayoutModule, MaterialModule, UiComponentsModule, UiModule } from '@app/shared/ui';
import { components } from './components';
import { DmsImportRoutingModule } from './dms-import-routing.module';
import { pages } from './pages';
import { DmsImportService } from './services/dms-import.service';
import { DmsImportEffects } from './state/dms-import.effects';
import { DmsImportFacade } from './state/dms-import.facade';
import * as fromDmsImport from './state/dms-import.reducer';

@NgModule({
  declarations: [pages, components],
  imports: [
    CommonModule,
    DmsImportRoutingModule,
    UiModule,
    UiComponentsModule,
    MaterialModule,
    DialogsModule,
    CustomFormsModule,
    PipesModule,
    LayoutModule,
    StoreModule.forFeature(StateFeatureKey.DmsImport, fromDmsImport.dmsImportReducer),
    EffectsModule.forFeature([DmsImportEffects]),
  ],
  providers: [DmsImportFacade, DmsImportService],
})
export class DmsImportModule {}
