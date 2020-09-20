import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiscQueriesComponent } from './misc-queries.component';

describe('MiscQueriesComponent', () => {
  let component: MiscQueriesComponent;
  let fixture: ComponentFixture<MiscQueriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiscQueriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiscQueriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
