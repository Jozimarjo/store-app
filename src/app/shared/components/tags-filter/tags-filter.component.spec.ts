import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsFilterComponent } from './tags-filter.component';

describe('TagsFilterComponent', () => {
  let component: TagsFilterComponent;
  let fixture: ComponentFixture<TagsFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TagsFilterComponent]
    });
    fixture = TestBed.createComponent(TagsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
