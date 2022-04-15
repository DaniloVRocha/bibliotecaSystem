import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GravarClienteComponent } from './gravar-cliente.component';

describe('GravarClienteComponent', () => {
  let component: GravarClienteComponent;
  let fixture: ComponentFixture<GravarClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GravarClienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GravarClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
