import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardDetalheComponent } from './dashboard-detalhe.component';
import { MOCK_ENTREGAS } from '../dashboard.mock';
import { DashboardEntity } from '../dashboard.class';

describe('DashboardDetalheComponent', () => {
  let component: DashboardDetalheComponent;
  let fixture: ComponentFixture<DashboardDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardDetalheComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardDetalheComponent);
    component = fixture.componentInstance;
    component.dash = new DashboardEntity(MOCK_ENTREGAS);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should ngOnInit method "tipo = 2"', () => {
    component.tipo = 2;
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.tipo).toBe(2);
  });

  it('should ngOnInit method "tipo = 3"', () => {
    component.tipo = 3;
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.tipo).toBe(3);
  });
});
