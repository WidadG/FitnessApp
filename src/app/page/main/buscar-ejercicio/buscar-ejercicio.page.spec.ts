import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BuscarEjercicioPage } from './buscar-ejercicio.page';

describe('BuscarEjercicioPage', () => {
  let component: BuscarEjercicioPage;
  let fixture: ComponentFixture<BuscarEjercicioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarEjercicioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
