import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DirectivesModule } from '@app/shared/directives';
import { PipesModule } from '@app/shared/pipes';
import { CustomFormsModule, DialogsModule, MaterialModule, UiComponentsModule, UiModule } from '@app/shared/ui';
import { QRCodeModule } from 'angularx-qrcode';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { commonComponents, dialogComponents, formComponents } from './components';
import { notesComponent } from './components/common/notes';
import { DirtyValidCheckGuard } from './guards';

const maskConfig: Partial<IConfig> = {
  validation: true,
};
@NgModule({
  declarations: [...commonComponents, ...formComponents, dialogComponents, ...notesComponent],
  imports: [
    CommonModule,
    MaterialModule,
    CustomFormsModule,
    DialogsModule,
    UiModule,
    PipesModule,
    ReactiveFormsModule,
    UiComponentsModule,
    ClipboardModule,
    TranslateModule,
    DirectivesModule,
    NgxMaskModule.forRoot(maskConfig),
    QRCodeModule,
  ],
  exports: [...commonComponents, ...formComponents, dialogComponents, ...notesComponent],
  providers: [DirtyValidCheckGuard],
})
export class ComponentsModule {}
