import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EjemploFormularioComponent } from './ejemplo-formulario.component';

describe('EjemploFormularioComponent', () => {
  let component: EjemploFormularioComponent;
  let fixture: ComponentFixture<EjemploFormularioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EjemploFormularioComponent]
    });
    fixture = TestBed.createComponent(EjemploFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
