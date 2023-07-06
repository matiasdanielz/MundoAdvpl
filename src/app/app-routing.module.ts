import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { QueryConverterComponent } from './query-converter/query-converter.component';

const routes: Routes = [
  {path: "", component: QueryConverterComponent},
  {path: "menu", component: MenuComponent},
  {path: "queryConverter", component: QueryConverterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }