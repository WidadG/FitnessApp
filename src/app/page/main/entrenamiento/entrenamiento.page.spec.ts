import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EntrenamientoPage } from './entrenamiento.page';

describe('EntrenamientoPage', () => {
  let component: EntrenamientoPage;
  let fixture: ComponentFixture<EntrenamientoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EntrenamientoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
