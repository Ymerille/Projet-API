import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestConnexionComponent } from './test-connexion.component';

describe('UserProfileComponent', () => {
  let component: TestConnexionComponent;
  let fixture: ComponentFixture<TestConnexionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestConnexionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestConnexionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
