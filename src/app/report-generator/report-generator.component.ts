import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report-generator',
  templateUrl: './report-generator.component.html',
  styleUrls: ['./report-generator.component.css']
})
export class ReportGeneratorComponent implements OnInit {

  public srcImage: string = "./assets/big-lock.svg";

  constructor() { }

  ngOnInit(): void {
  }

}
