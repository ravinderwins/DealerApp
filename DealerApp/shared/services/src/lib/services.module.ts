import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule, CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog'; 
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { SnackbarComponent } from './components';
import { services } from './services';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    SnackbarComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    MatSnackBarModule,
    MatDialogModule,
    MatTooltipModule,
    ClipboardModule
  ],
  providers: [
    DatePipe,
    CurrencyPipe,
    DecimalPipe,

    ...services
  ],
})
export class ServicesModule { }
