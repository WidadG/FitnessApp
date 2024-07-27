import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfigPlanPage } from './config-plan.page';

describe('ConfigPlanPage', () => {
  let component: ConfigPlanPage;
  let fixture: ComponentFixture<ConfigPlanPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigPlanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
