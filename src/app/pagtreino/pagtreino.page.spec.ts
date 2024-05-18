import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PagtreinoPage } from './pagtreino.page';

describe('PagtreinoPage', () => {
  let component: PagtreinoPage;
  let fixture: ComponentFixture<PagtreinoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PagtreinoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
