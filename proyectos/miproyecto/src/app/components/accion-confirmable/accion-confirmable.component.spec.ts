import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccionConfirmableComponent } from './accion-confirmable.component';

describe('AccionConfirmableComponent', () => {
  let component: AccionConfirmableComponent;
  let fixture: ComponentFixture<AccionConfirmableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccionConfirmableComponent]
    });
    fixture = TestBed.createComponent(AccionConfirmableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
