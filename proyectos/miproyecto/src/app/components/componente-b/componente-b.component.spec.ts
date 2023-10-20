import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteBComponent } from './componente-b.component';

describe('ComponenteBComponent', () => {
  let component: ComponenteBComponent;
  let fixture: ComponentFixture<ComponenteBComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComponenteBComponent]
    });
    fixture = TestBed.createComponent(ComponenteBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
