import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GravarAutoresComponent } from './gravar-autores.component';

describe('GravarAutoresComponent', () => {
  let component: GravarAutoresComponent;
  let fixture: ComponentFixture<GravarAutoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GravarAutoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GravarAutoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
