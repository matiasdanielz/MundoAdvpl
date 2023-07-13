import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QueryConverterComponent } from './query-converter/query-converter.component';
import { ExcelGeneratorComponent } from './excel-generator/excel-generator.component';
import { ReportGeneratorComponent } from './report-generator/report-generator.component';

const routes: Routes = [
  {path: "", component: QueryConverterComponent},
  {path: "queryConverter", component: QueryConverterComponent},
  {path: "excelGenerator", component: ExcelGeneratorComponent},
  {path: "reportGenerator", component: ReportGeneratorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
