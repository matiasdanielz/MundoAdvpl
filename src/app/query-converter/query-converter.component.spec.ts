import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryConverterComponent } from './query-converter.component';

describe('QueryConverterComponent', () => {
  let component: QueryConverterComponent;
  let fixture: ComponentFixture<QueryConverterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QueryConverterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QueryConverterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
