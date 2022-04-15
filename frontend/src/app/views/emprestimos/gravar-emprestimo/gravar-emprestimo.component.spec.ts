import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GravarEmprestimoComponent } from './gravar-emprestimo.component';

describe('GravarEmprestimoComponent', () => {
  let component: GravarEmprestimoComponent;
  let fixture: ComponentFixture<GravarEmprestimoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GravarEmprestimoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GravarEmprestimoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
