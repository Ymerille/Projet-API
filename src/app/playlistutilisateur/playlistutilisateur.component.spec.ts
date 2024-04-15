import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistutilisateurComponent } from './playlistutilisateur.component';

describe('PlaylistutilisateurComponent', () => {
  let component: PlaylistutilisateurComponent;
  let fixture: ComponentFixture<PlaylistutilisateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlaylistutilisateurComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlaylistutilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
