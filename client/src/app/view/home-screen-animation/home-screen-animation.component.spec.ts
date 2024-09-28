import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeScreenAnimationComponent } from './home-screen-animation.component';

describe('HomeScreenAnimationComponent', () => {
  let component: HomeScreenAnimationComponent;
  let fixture: ComponentFixture<HomeScreenAnimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeScreenAnimationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeScreenAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
