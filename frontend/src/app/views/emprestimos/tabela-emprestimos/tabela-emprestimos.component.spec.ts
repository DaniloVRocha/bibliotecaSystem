import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaEmprestimosComponent } from './tabela-emprestimos.component';

describe('TabelaEmprestimosComponent', () => {
  let component: TabelaEmprestimosComponent;
  let fixture: ComponentFixture<TabelaEmprestimosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabelaEmprestimosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabelaEmprestimosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
