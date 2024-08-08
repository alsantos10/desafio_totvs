import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MOCK_ENTREGAS } from '../dashboard/dashboard.mock';
import { of } from 'rxjs';
import { MatSort } from '@angular/material/sort';

import { EntregasComponent } from './entregas.component';

describe('EntregasComponent', () => {
  let component: EntregasComponent;
  let fixture: ComponentFixture<EntregasComponent>;

  const route = ({ data: of({ entregas: MOCK_ENTREGAS }) } as any) as ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        EntregasComponent,
        NoopAnimationsModule,
        RouterModule.forRoot([])
      ],
      providers: [{ provide: ActivatedRoute, useValue: route }],
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntregasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fMotorista value change', () => {
    component.fMotorista.setValue('Carlos Pereira');
    fixture.detectChanges();
    expect(component.fMotorista.value).toBe('Carlos Pereira');
  });

  it('should fStatus value change', () => {
    component.fStatus.setValue('PENDENTE');
    fixture.detectChanges();
    expect(component.fStatus.value).toBe('PENDENTE');
  });

  it('should filtrar method change status and motorista value)', () => {
    component.filtrar('ENTREGUE', 'Carlos Pereira');
    fixture.detectChanges();
    expect(component.entregas.length).toBe(2);
  });

  it('should filtrar method change status and motorista value)', () => {
    component.dataSource.sort = new MatSort();
    component.dataSource.sort.active = 'motorista';
    component.dataSource.sort.direction = 'desc';
    component.dataSource.connect();
    fixture.detectChanges();
    expect(component.entregas.length).toBe(2);
  });
});
