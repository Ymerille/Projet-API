import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageConnecterComponent } from './home-page-connecter.component';

describe('HomePageConnecterComponent', () => {
  let component: HomePageConnecterComponent;
  let fixture: ComponentFixture<HomePageConnecterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePageConnecterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomePageConnecterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
