import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalharEmprestimoComponent } from './detalhar-emprestimo.component';

describe('DetalharEmprestimoComponent', () => {
  let component: DetalharEmprestimoComponent;
  let fixture: ComponentFixture<DetalharEmprestimoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalharEmprestimoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalharEmprestimoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
