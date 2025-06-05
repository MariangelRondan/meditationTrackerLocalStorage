import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPeriodComponent } from './my-period.component';

describe('MyPeriodComponent', () => {
  let component: MyPeriodComponent;
  let fixture: ComponentFixture<MyPeriodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyPeriodComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
