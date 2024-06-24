import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DmsImportPageComponent } from './pages';

const routes: Routes = [
  {
    path: '',
    component: DmsImportPageComponent,
    pathMatch: 'full'
  },
  {
    path: ':id',
    component: DmsImportPageComponent,
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DmsImportRoutingModule {}
