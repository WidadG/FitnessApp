import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistorialEntrenamientosPage } from './historial-entrenamientos.page';

describe('HistorialEntrenamientosPage', () => {
  let component: HistorialEntrenamientosPage;
  let fixture: ComponentFixture<HistorialEntrenamientosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialEntrenamientosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
