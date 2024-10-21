import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompraEntradasPage } from './compra-entradas.page';

describe('CompraEntradasPage', () => {
  let component: CompraEntradasPage;
  let fixture: ComponentFixture<CompraEntradasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CompraEntradasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});