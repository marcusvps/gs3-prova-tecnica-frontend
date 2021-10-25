import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListHistoricoComponent } from './list-historico.component';

describe('ListComponent', () => {
  let component: ListHistoricoComponent;
  let fixture: ComponentFixture<ListHistoricoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListHistoricoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListHistoricoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
