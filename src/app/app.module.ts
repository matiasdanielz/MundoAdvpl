import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PoModule } from '@po-ui/ng-components';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { PoTemplatesModule } from '@po-ui/ng-templates';
import { QueryConverterComponent } from './query-converter/query-converter.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExcelGeneratorComponent } from './excel-generator/excel-generator.component';
import { PoCodeEditorModule } from '@po-ui/ng-code-editor';
import { ReportGeneratorComponent } from './report-generator/report-generator.component';

@NgModule({
  declarations: [
    AppComponent,
    QueryConverterComponent,
    ExcelGeneratorComponent,
    ReportGeneratorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PoModule,
    HttpClientModule,
    RouterModule.forRoot([]),
    PoTemplatesModule,
    FormsModule,
    BrowserAnimationsModule,
    PoCodeEditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
