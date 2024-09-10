import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EntrenandoPage } from './entrenando.page';

describe('EntrenandoPage', () => {
  let component: EntrenandoPage;
  let fixture: ComponentFixture<EntrenandoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EntrenandoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
