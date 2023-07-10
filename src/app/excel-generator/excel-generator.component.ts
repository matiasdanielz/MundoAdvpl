import { Component, OnInit } from '@angular/core';
import { PoDisclaimer } from '@po-ui/ng-components';

@Component({
  selector: 'app-excel-generator',
  templateUrl: './excel-generator.component.html',
  styleUrls: ['./excel-generator.component.css']
})
export class ExcelGeneratorComponent implements OnInit {

  public disclaimer!: PoDisclaimer;
  public disclaimers: Array<PoDisclaimer> = [{ value: 'disclaimer' }];

  public event: string = '';

  constructor() { }

  ngOnInit(): void {
    this.restore();
  }

  public addDisclaimer() {
    this.disclaimers = [...this.disclaimers, this.disclaimer];

    this.disclaimer = { value: undefined };
  }

  public changeEvent(event: string) {
    this.event = event;
  }

  public restore() {
    this.disclaimer = { value: undefined };
    this.disclaimers = [];

    this.event = '';
  }
}
