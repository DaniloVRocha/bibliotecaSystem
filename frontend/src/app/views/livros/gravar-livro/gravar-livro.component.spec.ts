import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GravarLivroComponent } from './gravar-livro.component';

describe('GravarLivroComponent', () => {
  let component: GravarLivroComponent;
  let fixture: ComponentFixture<GravarLivroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GravarLivroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GravarLivroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
