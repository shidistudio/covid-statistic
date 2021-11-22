import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartPlugComponent } from './chart-plug.component';

describe('ChartPlugComponent', () => {
  let component: ChartPlugComponent;
  let fixture: ComponentFixture<ChartPlugComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartPlugComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartPlugComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
