import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { directives } from './directives';

@NgModule({
  declarations: [...directives],
  imports: [CommonModule, MatTooltipModule],
  exports: [...directives],
})
export class DirectivesModule {}
