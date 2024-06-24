import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { pipes } from './pipes';
@NgModule({
  declarations: [...pipes],
  imports: [CommonModule],
  exports: [...pipes],
})
export class PipesModule { }
 
