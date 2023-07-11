import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QueryConverterComponent } from './query-converter/query-converter.component';
import { ExcelGeneratorComponent } from './excel-generator/excel-generator.component';

const routes: Routes = [
  {path: "", component: QueryConverterComponent},
  {path: "queryConverter", component: QueryConverterComponent},
  {path: "excelGenerator", component: ExcelGeneratorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
