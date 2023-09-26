import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableMobileComponent } from './table-mobile.component';

describe('TableMobileComponent', () => {
  let component: TableMobileComponent;
  let fixture: ComponentFixture<TableMobileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableMobileComponent]
    });
    fixture = TestBed.createComponent(TableMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
