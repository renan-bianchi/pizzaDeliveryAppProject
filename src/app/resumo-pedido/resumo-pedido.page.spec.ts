import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResumoPedidoPage } from './resumo-pedido.page';

describe('ResumoPedidoPage', () => {
  let component: ResumoPedidoPage;
  let fixture: ComponentFixture<ResumoPedidoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumoPedidoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
