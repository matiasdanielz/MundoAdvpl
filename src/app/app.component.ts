import { Component } from '@angular/core';

import { PoMenuItem } from '@po-ui/ng-components';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  readonly menus: Array<PoMenuItem> = [
    //{ label: 'Biblioteca de Telas', shortLabel: "Telas", link: 'queryConverter', icon: 'po-icon-device-desktop' },
    { label: 'Conversor De Query', shortLabel: "Querys", link: 'queryConverter', icon: 'po-icon-database' },
    { label: 'Geradores', shortLabel: "Gerad.", link: 'queryConverter', icon: 'po-icon-document-filled', subItems: [
      //{ label: 'Gerador De Pdf', shortLabel: "Pdf", link: 'queryConverter', icon: 'po-icon-pdf' },
      { label: 'Gerador De Excel', shortLabel: "Excel", link: 'excelGenerator', icon: 'po-icon-database' },
      { label: 'Gerador De Relatorio', shortLabel: "Querys", link: 'reportGenerator', icon: 'po-icon-document-filled' },
      //{ label: 'Gerador De Tabelas', shortLabel: "Querys", link: 'queryConverter', icon: 'po-icon-database' },
      //{ label: 'Gerador De APIs', shortLabel: "Querys", link: 'queryConverter', icon: 'po-icon-database' },
    ] },
  ];

}
